import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ChatSession, SessionSummary, ChatMessage } from '../services/ChatApiService';
import * as SessionStorage from '../services/SessionStorageService';

interface SessionContextType {
  sessions: SessionSummary[];
  activeSessionId: string | null;
  activeSessionMessages: ChatMessage[];
  isLoadingSession: boolean;
  isLoadingSummaries: boolean; // To indicate summaries are being loaded initially
  
  selectSession: (sessionId: string) => Promise<void>;
  createNewSession: () => Promise<string | null>; // Returns new session ID or null
  saveMessageToActiveSession: (message: ChatMessage) => Promise<void>;
  renameSession: (sessionId: string, newTitle: string) => Promise<void>; // Changed from renameActiveSession
  deleteSession: (sessionId: string) => Promise<void>;
  refreshSessionSummaries: () => Promise<void>; // To reload summaries
  updateMessageFeedbackInActiveSession: (
    messageId: string,
    feedback: ChatMessage['feedback'],
    detailedFeedback?: ChatMessage['detailedFeedback']
  ) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeSessionMessages, setActiveSessionMessages] = useState<ChatMessage[]>([]);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);
  const [isLoadingSummaries, setIsLoadingSummaries] = useState<boolean>(true);

  const loadSessionSummaries = async () => {
    setIsLoadingSummaries(true);
    try {
      const fetchedSummaries = await SessionStorage.getAllSessionSummaries();
      setSessions(fetchedSummaries);
    } catch (error) {
      console.error("Failed to load session summaries:", error);
      setSessions([]); // Set to empty array on error
    } finally {
      setIsLoadingSummaries(false);
    }
  };

  useEffect(() => {
    loadSessionSummaries();
  }, []);

  // TODO: Implement other context provider functions (Task C.2.2)
  // - selectSession
  // - createNewSession
  // - saveMessageToActiveSession
  // - renameActiveSession (or renameSessionById)
  // - deleteSession

  const selectSession = async (sessionId: string) => {
    setIsLoadingSession(true);
    setActiveSessionId(sessionId); // Set active ID immediately for UI feedback
    try {
      const session = await SessionStorage.getChatSession(sessionId);
      if (session) {
        setActiveSessionMessages(session.messages);
      } else {
        console.warn('Session ' + sessionId + ' not found in storage.');
        setActiveSessionMessages([]); // Clear messages if session not found
        // Consider if activeSessionId should be nulled out if session is truly gone
        // For now, it might be okay if it was just deleted and summaries haven't refreshed.
      }
    } catch (error) {
      console.error('Error selecting session ' + sessionId + ':', error);
      setActiveSessionMessages([]); // Clear messages on error
    } finally {
      setIsLoadingSession(false);
    }
  };
  
  const contextValue: SessionContextType = {
    sessions,
    activeSessionId,
    activeSessionMessages,
    isLoadingSession,
    isLoadingSummaries,
    selectSession, // Use the implemented function
    createNewSession: async (): Promise<string | null> => {
      try {
        const newSession = SessionStorage.createNewSessionObject(); // Gets a default title
        await SessionStorage.saveChatSession(newSession); // Saves full session and updates summaries in storage
        
        // Refresh summaries in context state
        await loadSessionSummaries(); 
        
        setActiveSessionId(newSession.id);
        setActiveSessionMessages(newSession.messages); // Should be empty initially
        return newSession.id;
      } catch (error) {
        console.error("Failed to create new session:", error);
        return null;
      }
    },
    saveMessageToActiveSession: async (message: ChatMessage) => {
      if (!activeSessionId) {
        console.error("No active session to save message to.");
        // Optionally, could create a new session here if desired.
        // For now, we'll assume ChatScreen ensures an active session or creates one.
        return;
      }
      try {
        // Optimistically update local state for responsiveness
        setActiveSessionMessages(prevMessages => [...prevMessages, message]);

        // Persist the change
        const currentSession = await SessionStorage.getChatSession(activeSessionId);
        if (currentSession) {
          // Base messages for storage on what was last saved, plus the new message
          const messagesForStorage = [...currentSession.messages, message];
          // Ensure uniqueness in case of rapid calls or ID issues (defensive)
          const uniqueMessages = Array.from(new Map(messagesForStorage.map(m => [m.id, m])).values());

          const updatedSession: ChatSession = {
            ...currentSession,
            messages: uniqueMessages, 
            // updatedAt will be handled by SessionStorage.saveChatSession
          };
          await SessionStorage.saveChatSession(updatedSession);
          await loadSessionSummaries(); 
        } else {
          // This case: activeSessionId exists, but session not found in storage.
          // This might happen if createNewSession set activeId but initial save failed/is slow.
          // Create the session now with this message.
          console.warn('Active session ' + activeSessionId + ' not found during saveMessage. Creating it now.');
          const newSessionToSave = SessionStorage.createNewSessionObject(); // Gets a default title
          // Important: Use the existing activeSessionId if we are in this state
          newSessionToSave.id = activeSessionId; 
          newSessionToSave.messages = [message]; // Start with the current message
          // Ensure UI state for messages reflects this single message for the new session
          setActiveSessionMessages([message]); 
          await SessionStorage.saveChatSession(newSessionToSave);
          await loadSessionSummaries();
        }
      } catch (error) {
        console.error("Failed to save message to active session:", error);
        // Consider reverting optimistic setActiveSessionMessages update if persistence fails
        // setActiveSessionMessages(prevMessages => prevMessages.filter(m => m.id !== message.id));
      }
    },
    renameSession: async (sessionId: string, newTitle: string) => {
      if (!sessionId) {
        console.error("No session ID provided to rename.");
        return;
      }
      try {
        await SessionStorage.updateSessionTitle(sessionId, newTitle);
        
        // Optimistically update ONLY the title in the local 'sessions' state
        // Do NOT update updatedAt or re-sort, to maintain list position
        setSessions(prevSessions =>
          prevSessions.map(s =>
            s.id === sessionId ? { ...s, title: newTitle, hasCustomTitle: true } : s
          )
        );
      } catch (error) {
        console.error('Failed to rename session ' + sessionId + ':', error);
      }
    },
    deleteSession: async (sessionId: string) => {
      try {
        await SessionStorage.deleteChatSession(sessionId);
        // Refresh summaries from storage
        await loadSessionSummaries(); 
        
        if (activeSessionId === sessionId) {
          // If the deleted session was active, try to select another one or clear.
          if (sessions.length > 0) {
            // After loadSessionSummaries, 'sessions' state is updated.
            // Select the first available session.
            // Note: loadSessionSummaries updates 'sessions' state asynchronously.
            // To use the *very latest* sessions list post-delete for selection,
            // it might be better to get it from the return of SessionStorage.deleteChatSession
            // if that service was modified to return the new list, or re-fetch here.
            // However, loadSessionSummaries() was just awaited.
            const newSummaries = await SessionStorage.getAllSessionSummaries(); // Re-fetch to be absolutely sure
            if (newSummaries.length > 0) {
              await selectSession(newSummaries[0].id);
            } else {
              // No sessions left, clear active session. ChatScreen will create a new one.
              setActiveSessionId(null);
              setActiveSessionMessages([]);
            }
          } else {
            // No sessions left after deletion (this means 'sessions' state was empty before this check)
            // This case should ideally be covered by newSummaries.length > 0 check if loadSessionSummaries worked.
            // For safety, ensure active session is cleared.
            setActiveSessionId(null);
            setActiveSessionMessages([]);
          }
        }
      } catch (error) {
        console.error('Failed to delete session ' + sessionId + ':', error);
      }
    },
    updateMessageFeedbackInActiveSession: async (
      messageId: string,
      feedback: ChatMessage['feedback'],
      detailedFeedback?: ChatMessage['detailedFeedback']
    ) => {
      if (!activeSessionId) {
        console.error("No active session to update message feedback.");
        return;
      }
      try {
        const updatedMsgs = activeSessionMessages.map(msg => {
          if (msg.id === messageId) {
            return { ...msg, feedback, detailedFeedback: detailedFeedback !== undefined ? detailedFeedback : msg.detailedFeedback };
          }
          return msg;
        });
        setActiveSessionMessages(updatedMsgs); // Optimistic update

        const currentSession = await SessionStorage.getChatSession(activeSessionId);
        if (currentSession) {
          const updatedSessionData: ChatSession = {
            ...currentSession,
            messages: updatedMsgs,
            // updatedAt will be handled by saveChatSession
          };
          await SessionStorage.saveChatSession(updatedSessionData);
          await loadSessionSummaries(); // Refresh summaries as updatedAt changed
        } else {
          console.error('Active session not found in storage for feedback update.');
          // Potentially revert optimistic update of activeSessionMessages
        }
      } catch (error) {
        console.error('Failed to update message feedback:', error);
        // Potentially revert optimistic update
      }
    },
    refreshSessionSummaries: loadSessionSummaries, // Use the implemented function
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
