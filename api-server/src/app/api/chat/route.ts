import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatRequestBody {
  prompt: string;
}

// Updated ChatResponseBody to match expected structure for Gemini integration
export interface ChatResponseBody {
  reply: string | null;
  error: string | null;
}

// Initialize the Google Gemini AI client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error(
    'GEMINI_API_KEY is not set. Please set it in your environment variables.',
  );
  // Optionally, throw an error or handle this case as appropriate for your application startup
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }); // Using flash for potentially faster chat

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    console.log('Received prompt:', body.prompt);

    if (!GEMINI_API_KEY) {
      console.error(
        'GEMINI_API_KEY is not configured, cannot call Gemini API.',
      );
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'AI service is not configured.',
      };
      return NextResponse.json(errorResponseBody, { status: 500 });
    }

    if (!body.prompt) {
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'Prompt cannot be empty.',
      };
      return NextResponse.json(errorResponseBody, { status: 400 });
    }

    const chat = model.startChat({
      history: [],
      // generationConfig: { // Optional: configure generation parameters
      //   temperature: 0.9,
      //   topK: 1,
      //   topP: 1,
      //   maxOutputTokens: 2048,
      // },
    });

    const result = await chat.sendMessage(body.prompt);
    const aiResponse = result.response;
    const text = aiResponse.text();

    const responseBody: ChatResponseBody = {
      reply: text,
      error: null,
    };
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    const errorMessage = 'Error communicating with AI service.';
    if (error instanceof Error) {
      // It's good practice to not expose raw error messages to the client
      // For debugging, log the full error server-side
      console.error('Gemini API error:', error.message);
      // You might want to check for specific error types from Gemini SDK if available
      // and customize client-facing messages accordingly.
    } else {
      console.error('Unknown error in /api/chat:', error);
    }

    const errorResponseBody: ChatResponseBody = {
      reply: null,
      error: errorMessage, // Generic error message for the client
    };
    return NextResponse.json(errorResponseBody, { status: 500 });
  }
}
