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
  role: 'system',
  parts: [
    {
      text: "คุณคือ 'ขารมย์' (KhaRom) AI ผู้ช่วยด้านการเดท ตอบเป็นภาษาไทยเท่านั้นเสมอ ไม่ว่าคำถามจะเป็นภาษาใดก็ตาม ย้ำ! ตอบเป็นภาษาไทยเท่านั้น นี่คือกฎเหล็กห้ามฝ่าฝืนเด็ดขาด ช่วยผู้ใช้สร้างสรรค์ข้อความแชทสำหรับสถานการณ์การเดทต่างๆ เช่น การเริ่มบทสนทนา การตอบข้อความ และการชวนคุยอย่างมั่นใจและเหมาะสมกับวัฒนธรรมไทย เน้นการใช้คำพูดที่สุภาพแต่เป็นกันเอง สร้างสรรค์ และน่าสนใจ",
    },
  ],
};

// Define the system instruction for the translation step
const translationSystemInstruction = {
  role: 'system',
  parts: [
    {
      text: 'You are an AI language translator. Your sole task is to translate the given text into Thai. Respond ONLY with the translated Thai text. Do not add any commentary, greetings, or extra information.',
    },
  ],
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
      },
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

    const chatHistory = [
      {
        role: 'user',
        parts: [
          {
            text: 'Hello, can you help me with a dating message in Thai?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'สวัสดีค่ะ ขารมย์ยินดีช่วยค่ะ บอกสถานการณ์มาได้เลยค่ะ',
          },
        ],
      },
      {
        role: 'user',
        parts: [{ text: 'I want to sound flirty but respectful.' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'แน่นอนค่ะ ลองเริ่มต้นด้วยความเป็นมิตรและชมเชยอย่างจริงใจดูนะคะ เช่น "โปรไฟล์คุณน่าสนใจมากเลยค่ะ โดยเฉพาะเรื่อง..." แล้วค่อยๆหยอดความรู้สึกดีๆเข้าไปค่ะ',
          },
        ],
      },
    ];

    const chat = model.startChat({
      history: chatHistory,
      systemInstruction: khaRomSystemInstruction,
      // generationConfig: { // Optional: configure generation parameters
      //   temperature: 0.9,
      //   topK: 1,
      //   topP: 1,
      //   maxOutputTokens: 2048,
      // },
    });

    // Wrap the user's prompt with additional instructions
    const wrappedPrompt = `ข้อความจากผู้ใช้: '${body.prompt}'\n\nขารมย์ โปรดวิเคราะห์ข้อความนี้และตอบกลับเป็นภาษาไทยเท่านั้น โดยให้คำแนะนำที่เหมาะสมกับวัฒนธรรมการเดทของไทยและยึดมั่นตามคำสั่งของระบบอย่างเคร่งครัด`;
    console.log('Wrapped prompt with Thai instruction:', wrappedPrompt); // For debugging
    const result = await chat.sendMessage(wrappedPrompt);
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

    const initialResponseText = aiResponse.text();
    let finalText = initialResponseText;

    // Language detection heuristic
    const thaiChars = (initialResponseText.match(/[\u0E00-\u0E7F]/g) || []).length;
    const latinChars = (initialResponseText.match(/[a-zA-Z]/g) || []).length;
    const totalChars = initialResponseText.length;

    // Trigger translation if:
    // 1. There are Latin characters, AND
    // 2. Thai characters are absent or make up a very small percentage of the response.
    // Threshold: if Thai chars are less than 10% of total (and total > 0) AND Latin chars exist.
    const needsTranslation =
      latinChars > 0 &&
      (thaiChars === 0 || (totalChars > 0 && thaiChars / totalChars < 0.1));

    if (needsTranslation) {
      console.log(
        `Initial response (Thai: ${thaiChars}, Latin: ${latinChars}, Total: ${totalChars}) likely not Thai. Attempting translation: "${initialResponseText}"`,
      );
      try {
        // Use a new, simple chat session for translation
        // Re-use genAI instance, get a model reference
        const translationModel = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash-latest',
        });
        const translationChat = translationModel.startChat({
          systemInstruction: translationSystemInstruction,
          // No history needed for a direct translation task
        });

        const translationPrompt = `Please translate the following text into Thai: "${initialResponseText}"`;
        const translationResult =
          await translationChat.sendMessage(translationPrompt);
        const translatedText = translationResult.response.text();

        if (translationResult.response.promptFeedback?.blockReason) {
          console.warn(
            'Translation prompt was blocked:',
            translationResult.response.promptFeedback.blockReason,
            'Using original response.',
          );
          // finalText remains initialResponseText
        } else if (
          translatedText &&
          /[\u0E00-\u0E7F]/.test(translatedText) // Check if translation actually produced Thai
        ) {
          console.log('Successfully translated to Thai:', translatedText);
          finalText = translatedText;
        } else {
          console.warn(
            'Translation did not result in Thai text or was empty. Using original response. Translated attempt:',
            translatedText,
          );
          // finalText remains initialResponseText
        }
      } catch (translationError) {
        console.error('Error during translation step:', {
          error: translationError,
          type:
            translationError instanceof Error
              ? translationError.constructor.name
              : typeof translationError,
          message:
            translationError instanceof Error
              ? translationError.message
              : String(translationError),
        });
        // Fallback to original response if translation fails
        // finalText remains initialResponseText
        console.warn('Translation step failed. Using original response.');
      }
    } else {
      console.log(
        `Initial response (Thai: ${thaiChars}, Latin: ${latinChars}, Total: ${totalChars}) considered Thai or non-translatable. No translation attempted.`,
      );
    }

    const responseBody: ChatResponseBody = {
      reply: finalText,
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
