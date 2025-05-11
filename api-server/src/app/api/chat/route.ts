import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export interface ChatRequestBody {
  prompt: string;
  // Future: model?: string; // To allow client to specify model
}

// Types for response and error handling
export interface ChatResponseBody {
  reply: string | null;
  error: string | null;
  blocked?: boolean;
  blockReason?: string;
}

// Helper function to get appropriate status code and message for OpenAI API errors
function getOpenAIErrorDetails(error: unknown): { status: number; message: string } {
  if (error instanceof OpenAI.APIError) {
    const status = error.status || 500;
    let message = error.message || 'An unexpected error occurred with the AI service.';

    // Customize messages based on status codes if needed
    if (status === 401) {
      message = 'Authentication failed. Please check your OpenRouter API key.';
    } else if (status === 429) {
      message = 'Rate limit exceeded or quota reached. Please try again later or check your OpenRouter plan.';
    } else if (status === 400) {
      // Bad request, could be invalid model, malformed input, etc.
      message = `Invalid request to AI service: ${error.message}`;
    } else if (error.code === 'insufficient_quota') {
        message = 'You have exceeded your OpenRouter quota. Please check your billing details.';
        return { status: 429, message };
    }
    // Add more specific cases as identified
    return { status, message };
  }
  // Fallback for non-API errors (e.g., network errors) or if error is not an OpenAI.APIError
  if (error instanceof Error) {
    return {
        status: 500,
        message: `An unexpected error occurred: ${error.message}`,
      };
  }
  return {
    status: 500,
    message: 'An unknown error occurred while communicating with the AI service.',
  };
}

// Initialize the OpenAI client for OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || 'openai/gpt-3.5-turbo'; // Default model

if (!OPENROUTER_API_KEY) {
  console.error(
    'OPENROUTER_API_KEY is not set. Please set it in your environment variables.',
  );
}

const openAIClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY || '', // SDK requires a string, even if it's empty (will fail auth)
  defaultHeaders: {
    // Optional: Add any default headers OpenRouter might recommend or you might need
    // 'HTTP-Referer': 'YOUR_SITE_URL', // Example
    // 'X-Title': 'KhaRom AI', // Example
  },
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Check API key first
  if (!OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY is not configured');
    return new Response(
      JSON.stringify({
        reply: null,
        error: 'AI service is not configured (API key missing).',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    const userPrompt = body.prompt;
    // const requestedModel = body.model || OPENROUTER_DEFAULT_MODEL; // For future model selection by client

    console.log('Received prompt for OpenRouter:', userPrompt);
    // console.log('Using model:', requestedModel);


    if (!userPrompt) {
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'Prompt cannot be empty.',
      };
      return NextResponse.json(errorResponseBody, { status: 400 });
    }

    const completion = await openAIClient.chat.completions.create({
      model: OPENROUTER_DEFAULT_MODEL, // Use the default model from env
      messages: [{ role: 'user', content: userPrompt }],
      // temperature: 0.7, // Optional: configure generation parameters
      // max_tokens: 2048, // Optional
    });

    const AITextReply = completion.choices[0]?.message?.content;

    // OpenRouter (via OpenAI SDK) might have different ways to indicate content moderation.
    // The `finish_reason` could be 'content_filter'.
    // Or specific error codes might be returned for moderation.
    // This part needs to be adapted based on how OpenRouter signals moderation.
    // For now, we assume direct reply or an error that will be caught.

    if (completion.choices[0]?.finish_reason === 'content_filter') {
        console.log('Content blocked by OpenRouter/model provider:', completion.choices[0]);
        const responseBody: ChatResponseBody = {
            reply: null,
            error: 'Your request was blocked due to content safety filters by the AI provider.',
            blocked: true,
            blockReason: 'Content safety policy violation',
        };
        return NextResponse.json(responseBody, { status: 400 });
    }


    if (!AITextReply) {
      // This case might occur if the response structure is unexpected or message is empty
      console.error('OpenRouter response missing text content:', completion);
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'AI service returned an empty or invalid response.',
      };
      return NextResponse.json(errorResponseBody, { status: 500 });
    }

    const responseBody: ChatResponseBody = {
      reply: AITextReply,
      error: null,
    };
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error('OpenRouter API error details:', error); // Log the raw error

    // More detailed logging if it's an APIError
    if (error instanceof OpenAI.APIError) {
        console.error('OpenRouter APIError specific details:', {
            status: error.status,
            code: error.code,
            param: error.param,
            type: error.type,
            message: error.message,
        });
    }


    const { status, message } = getOpenAIErrorDetails(error);

    const errorResponseBody: ChatResponseBody = {
      reply: null,
      error: message,
    };
    return NextResponse.json(errorResponseBody, { status });
  }
}
