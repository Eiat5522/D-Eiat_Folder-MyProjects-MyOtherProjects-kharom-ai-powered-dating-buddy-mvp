import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export interface ChatRequestBody {
  prompt: string;
}

export interface ChatResponseBody {
  reply: string | null;
  error: string | null;
  blocked?: boolean;
  blockReason?: string;
}

function getOpenAIErrorDetails(error: unknown): { status: number; message: string } {
  if (error instanceof OpenAI.APIError) {
    const status = error.status || 500;
    let message = error.message || 'An unexpected error occurred with the AI service.';

    if (status === 401) {
      message = 'Authentication failed. Please check your OpenRouter API key.';
    } else if (status === 429) {
      message = 'Rate limit exceeded or quota reached. Please try again later or check your OpenRouter plan.';
    } else if (status === 400) {
      message = `Invalid request to AI service: ${error.message}`;
    } else if (error.code === 'insufficient_quota') {
      message = 'You have exceeded your OpenRouter quota. Please check your billing details.';
      return { status: 429, message };
    }
    return { status, message };
  }
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

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_DEFAULT_MODEL = 'mistralai/mistral-small-24b-instruct-2501';

if (!OPENROUTER_API_KEY) {
  console.error(
    'OPENROUTER_API_KEY is not set. Please set it in your environment variables.',
  );
}

const openAIClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'https://github.com/Eiat5522/KhaRom',
    'X-Title': 'KhaRom AI Dating Guru',
  },
});

const THAI_DATING_GURU_PROMPT = `คุณคือที่ปรึกษาด้านความรักชื่อดังของไทย ผู้เชี่ยวชาญในการให้คำแนะนำเรื่องความรักและการออกเดท

กฎสำคัญในการตอบ:
- ต้องตอบเป็นภาษาไทยเท่านั้น ไม่ว่าผู้ใช้จะถามด้วยภาษาอะไร
- ใช้ภาษาที่เป็นกันเอง เหมือนพูดคุยกับเพื่อน แต่ยังคงความสุภาพ
- ให้คำแนะนำที่จริงใจและปฏิบัติได้จริง โดยอธิบายเหตุผลประกอบ
- มีความเข้าใจในวัฒนธรรมการเดทของคนไทย
- ให้คำตอบที่กระชับ ตรงประเด็น ไม่วกวน
- ห้ามพูดซ้ำๆ หรือย้ำประโยคเดิม

เมื่อให้คำแนะนำ:
1. ให้คำแนะนำที่เฉพาะเจาะจงและนำไปใช้ได้จริง
2. แสดงความเห็นอกเห็นใจเมื่อผู้ใช้เล่าปัญหา
3. ชี้ให้เห็นทั้งข้อดีและข้อเสียในสถานการณ์ต่างๆ
4. รักษาบรรยากาศการสนทนาให้สบายๆ เป็นกันเอง`;

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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

    console.log('Received prompt for OpenRouter:', userPrompt);

    if (!userPrompt) {
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'Prompt cannot be empty.',
      };
      return NextResponse.json(errorResponseBody, { status: 400 });
    }

    const completion = await openAIClient.chat.completions.create({
      model: OPENROUTER_DEFAULT_MODEL,
      messages: [
        { 
          role: 'system', 
          content: THAI_DATING_GURU_PROMPT 
        },
        { 
          role: 'user', 
          content: userPrompt 
        }
      ],
      temperature: 0.8,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    });

    const AITextReply = completion.choices[0]?.message?.content;

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
    console.error('OpenRouter API error details:', error);

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
