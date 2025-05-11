import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatSession, SessionSummary, ChatMessage } from './ChatApiService'; // Assuming ChatMessage might be needed for snippets

const SESSION_SUMMARIES_KEY = 'KHAROM_SESSION_SUMMARIES';
const SESSION_PREFIX = 'KHAROM_SESSION_';

// Helper function to generate a unique ID (simple version for now)
export const generateId = (): string => Date.now().toString() + Math.random().toString(36).substring(2, 9);

export const getAllSessionSummaries = async (): Promise<SessionSummary[]> => {
  try {
    const summariesJson = await AsyncStorage.getItem(SESSION_SUMMARIES_KEY);
    if (summariesJson) {
      const summaries = JSON.parse(summariesJson);
      // Ensure it's an array before returning
      return Array.isArray(summaries) ? summaries : [];
    }
    return [];
  } catch (error) {
    console.error('Error getting all session summaries:', error);
    return []; // Return empty array on error
  }
};

export const getChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    const sessionKey = SESSION_PREFIX + sessionId;
    const sessionJson = await AsyncStorage.getItem(sessionKey);
    if (sessionJson) {
      const session = JSON.parse(sessionJson) as ChatSession;
      // Dates are stored as numbers (timestamps) or strings in JSON, convert back to Date objects if needed
      // For ChatMessage.timestamp, it's a Date object.
      // We need to ensure messages have their timestamp property as Date objects.
      if (session.messages) {
        session.messages = session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp), // Assuming timestamp was stored as ISO string or number
        }));
      }
      return session;
    }
    return null;
  } catch (error) {
    console.error('Error getting session ' + sessionId + ':', error);
    return null; // Return null on error
  }
};

export const saveChatSession = async (session: ChatSession): Promise<void> => {
  try {
    const sessionToSave = {
      ...session,
      updatedAt: Date.now(), // Update the timestamp
    };

    // Save the full session
    const sessionKey = SESSION_PREFIX + sessionToSave.id;
    await AsyncStorage.setItem(sessionKey, JSON.stringify(sessionToSave));

    // Update the summaries list
    let summaries = await getAllSessionSummaries();
    const summaryIndex = summaries.findIndex(s => s.id === sessionToSave.id);

    const lastMessage = sessionToSave.messages.length > 0 
      ? sessionToSave.messages[sessionToSave.messages.length - 1] 
      : null;
    
    const newSummary: SessionSummary = {
      id: sessionToSave.id,
      title: sessionToSave.title,
      updatedAt: sessionToSave.updatedAt,
      lastMessageSnippet: lastMessage ? lastMessage.text.substring(0, 50) : undefined,
      hasCustomTitle: sessionToSave.hasCustomTitle,
    };

    if (summaryIndex > -1) {
      summaries[summaryIndex] = newSummary;
    } else {
      summaries.push(newSummary);
    }

    // Sort summaries by updatedAt descending (newest first)
    summaries.sort((a, b) => b.updatedAt - a.updatedAt);

    await AsyncStorage.setItem(SESSION_SUMMARIES_KEY, JSON.stringify(summaries));

  } catch (error) {
    console.error('Error saving session ' + session.id + ':', error);
    // Optionally re-throw or handle more gracefully
  }
};

export const deleteChatSession = async (sessionId: string): Promise<void> => {
  try {
    // Delete the full session
    const sessionKey = SESSION_PREFIX + sessionId;
    await AsyncStorage.removeItem(sessionKey);

    // Update the summaries list
    let summaries = await getAllSessionSummaries();
    summaries = summaries.filter(s => s.id !== sessionId);

    await AsyncStorage.setItem(SESSION_SUMMARIES_KEY, JSON.stringify(summaries));

  } catch (error) {
    console.error('Error deleting session ' + sessionId + ':', error);
    // Optionally re-throw or handle more gracefully
  }
};

export const updateSessionTitle = async (sessionId: string, newTitle: string): Promise<void> => {
  try {
    const session = await getChatSession(sessionId);
    if (session) {
      // Update only the title in the full session data, keep original updatedAt
      const updatedSessionData = { 
        ...session, 
        title: newTitle,
        hasCustomTitle: true // Mark as having a custom title when renamed
        // IMPORTANT: Do not update session.updatedAt here to keep its sort position
      };
      const sessionKey = SESSION_PREFIX + sessionId;
      await AsyncStorage.setItem(sessionKey, JSON.stringify(updatedSessionData));

      // Update the title in the summaries list, keeping original updatedAt
      let summaries = await getAllSessionSummaries();
      const summaryIndex = summaries.findIndex(s => s.id === sessionId);
      if (summaryIndex > -1) {
        summaries[summaryIndex].title = newTitle;
        summaries[summaryIndex].hasCustomTitle = true;
        // IMPORTANT: Do not update summaries[summaryIndex].updatedAt
        // The list is already sorted by updatedAt, changing only title won't change sort order.
        await AsyncStorage.setItem(SESSION_SUMMARIES_KEY, JSON.stringify(summaries));
      } else {
        console.warn('Session summary not found for title update:', sessionId);
      }
    } else {
      console.warn('Session not found for title update:', sessionId);
    }
  } catch (error) {
    console.error('Error updating session title for ' + sessionId + ':', error);
    // Optionally re-throw or handle more gracefully
  }
};

// Potentially a utility function to create a new session object if needed by SessionContext directly
export const createNewSessionObject = (title?: string): ChatSession => {
  const now = Date.now();
  return {
    id: generateId(),
    title: title || 'New Chat ' + new Date(now).toLocaleString(), // Default title
    messages: [],
    createdAt: now,
    updatedAt: now,
    hasCustomTitle: false, // New sessions start with default title
  };
};
