import { NextResponse } from 'next/server';
import { BlockReason, GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatRequestBody {
  prompt: string;
}

// Types for response and error handling
export interface ChatResponseBody {
  reply: string | null;
  error: string | null;
  blocked?: boolean;
  blockReason?: string;
}

// Helper function to determine if an error matches the expected Gemini error structure
function isGeminiError(error: unknown): error is {
  status: {
    code: number;
    message: string;
    details?: Record<string, unknown>[];
  };
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'object' &&
    'code' in (error as { status: { code: unknown } }).status &&
    'message' in (error as { status: { message: unknown } }).status
  );
}

// Helper function to get appropriate status code and message for different error types
function getErrorDetails(error: unknown): { status: number; message: string } {
  if (isGeminiError(error)) {
    const { code } = error.status;
    switch (code) {
      case 7: // PERMISSION_DENIED
      case 16: // UNAUTHENTICATED
        return {
          status: 401,
          message: 'Authentication failed. Please check API key configuration.',
        };
      case 8: // RESOURCE_EXHAUSTED
        return {
          status: 429,
          message: 'Request limit reached. Please try again later.',
        };


      case 3: // INVALID_ARGUMENT
        return {
          status: 400,
          message: 'Invalid request. Please check your input.',
        };
      case 14: // UNAVAILABLE
        return {
          status: 503,
          message: 'AI service is temporarily unavailable. Please try again later.',
        };
      case 13: // INTERNAL
        return {
          status: 500,
          message: 'An internal error occurred in the AI service.',
        };
      default:
        return {
          status: 500,
          message: 'An unexpected error occurred with the AI service.',
        };
    }
  }
  return {
    status: 500,
    message: 'Error communicating with AI service.',
  };
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

// Define the system instruction for KhaRom AI persona
const khaRomSystemInstruction = {
  parts: [{ text: "คุณคือ 'ขารมย์' (KhaRom) ผู้เชี่ยวชาญด้านการเดทอารมณ์ดีและมีเสน่ห์ ตอบเป็นภาษาไทยเท่านั้นเสมอ ช่วยผู้ใช้สร้างสรรค์ข้อความแชทสำหรับสถานการณ์การเดทต่างๆ เช่น การเริ่มบทสนทนา การตอบข้อความ และการชวนคุยอย่างมั่นใจและเหมาะสมกับวัฒนธรรมไทย เน้นการใช้คำพูดที่สุภาพแต่เป็นกันเอง สร้างสรรค์ และน่าสนใจ" }]
};

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Check API key first
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured');
    return new Response(
      JSON.stringify({
        reply: null,
        error: 'AI service is not configured',
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    console.log('Received prompt:', body.prompt);

    if (!body.prompt) {
      const errorResponseBody: ChatResponseBody = {
        reply: null,
        error: 'Prompt cannot be empty.',
      };
      return NextResponse.json(errorResponseBody, { status: 400 });
    }

    const chat = model.startChat({
      history: [],
      systemInstruction: khaRomSystemInstruction,
      // generationConfig: { // Optional: configure generation parameters
      //   temperature: 0.9,
      //   topK: 1,
      //   topP: 1,
      //   maxOutputTokens: 2048,
      // },
    });

    const result = await chat.sendMessage(body.prompt);
    const aiResponse = result.response;

    // Check for content safety blocks in the prompt feedback
    if (aiResponse.promptFeedback?.blockReason) {
      console.log('Content blocked:', {
        reason: aiResponse.promptFeedback?.blockReason as BlockReason,
        message: aiResponse.promptFeedback.blockReasonMessage,
        safetyRatings: aiResponse.promptFeedback.safetyRatings,
      });

      const responseBody: ChatResponseBody = {
        reply: null,
        error: 'Your request was blocked due to content safety filters.',
        blocked: true,
        blockReason:
          aiResponse.promptFeedback.blockReasonMessage ||
          'Content safety policy violation',
      };
      // Using 400 for blocked content since it's a client-side issue (inappropriate content)
      return NextResponse.json(responseBody, { status: 400 });
    }

    const text = aiResponse.text();
    const responseBody: ChatResponseBody = {
      reply: text,
      error: null,
    };
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    // Log the full error for debugging
    console.error('Gemini API error:', {
      error,
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
    });

    // Get appropriate status code and message based on error type
    const { status, message } = getErrorDetails(error);

    const errorResponseBody: ChatResponseBody = {
      reply: null,
      error: message,
    };
    return NextResponse.json(errorResponseBody, { status });
  }
}
