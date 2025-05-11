const API_URL = 'https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat';

export interface ChatMessage { // Renamed for clarity if used elsewhere
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  feedback?: 'liked' | 'disliked' | null; // For thumbs up/down
  detailedFeedback?: { // For detailed feedback on thumbs down
    presets: string[]; // e.g., ["inaccurate", "offensive"]
    comment: string;   // User's custom text
  } | null;
}

export interface ChatResponse {
  reply: string | null;
  error: string | null;
  blocked?: boolean;
  blockReason?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
  hasCustomTitle: boolean; // Flag to track if title has been manually set
}

export interface SessionSummary {
  id: string;
  title: string;
  updatedAt: number; // Unix timestamp, for sorting or display
  lastMessageSnippet?: string; // Optional: for display in history list
  hasCustomTitle: boolean; // Flag to track if title has been manually set
}

export const sendMessageToAI = async (prompt: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        // Ensure a string is returned for the error
        const errorMessage = typeof errorData.error === 'string' ? errorData.error : `HTTP error! status: ${response.status}`;
        return { reply: null, error: errorMessage, blocked: errorData.blocked, blockReason: errorData.blockReason };
      } catch (e) {
        return { reply: null, error: `HTTP error! status: ${response.status}` };
      }
    }
    // Assuming the successful response structure matches ChatResponse
    const successData: ChatResponse = await response.json();
    return successData;
  } catch (error) {
    console.error('Network error or failed to send message to AI service:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred';
    return { reply: null, error: errorMessage };
  }
};
