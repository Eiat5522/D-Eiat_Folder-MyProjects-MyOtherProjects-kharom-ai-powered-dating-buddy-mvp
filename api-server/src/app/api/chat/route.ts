import { NextRequest, NextResponse } from 'next/server';

export interface ChatRequestBody {
  prompt: string;
}

export interface ChatResponseBody {
  status: 'success' | 'error';
  message?: string; // For the AI's response or placeholder
  error?: string;   // For any error messages
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatRequestBody;
    // For now, we just log the prompt and return a placeholder
    console.log('Received prompt:', body.prompt);

    const responseBody: ChatResponseBody = {
      status: 'success',
      message: 'This is a placeholder AI response from /api/chat for prompt: ' + body.prompt,
    };
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in /api/chat:', errorMessage);
    const errorResponseBody: ChatResponseBody = {
      status: 'error',
      error: errorMessage,
    };
    return NextResponse.json(errorResponseBody, { status: 500 });
  }
}
