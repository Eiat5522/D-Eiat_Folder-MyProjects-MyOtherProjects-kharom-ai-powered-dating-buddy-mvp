import React, { useState, useCallback, useEffect } from 'react'; // Added useEffect
import { View, StyleSheet, SafeAreaView, Text, ActivityIndicator, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
// useLanguage no longer needed here as toggle is in drawer
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToAI, ChatMessage, ChatResponse } from '../services/ChatApiService';
import { useSession } from '../context/SessionContext'; // Import useSession
import * as SessionStorage from '../services/SessionStorageService'; // Moved import to top level

const ChatScreen: React.FC = () => {
  const { 
    activeSessionId, 
    activeSessionMessages, 
    isLoadingSession, 
    saveMessageToActiveSession, 
    createNewSession,
    // sessions, // Not directly used in ChatScreen currently, title is in AppNavigator
    isLoadingSummaries, 
    updateMessageFeedbackInActiveSession, // Destructure new function
  } = useSession();
  
  // Local state for AI response loading and errors specific to this screen/API call
  const [isAISending, setIsAISending] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // If summaries have loaded, there's no active session, and not currently creating one (implicit)
    // then create a new session.
    if (!isLoadingSummaries && !activeSessionId && createNewSession) {
      console.log("ChatScreen: No active session, creating a new one.");
      createNewSession(); 
      // createNewSession already sets the new session as active and updates messages.
    }
  }, [isLoadingSummaries, activeSessionId, createNewSession]);

  const handleSendMessage = useCallback(async (text: string, isRetry: boolean = false) => {
    if (!activeSessionId) {
      console.error("Cannot send message, no active session.");
      // Optionally trigger creation of a new session if this state is reached
      // const newId = await createNewSession();
      // if (!newId) return; // Failed to create new session
      // Then proceed to save message to this newId, but handleSendMessage would need activeSessionId from context
      return; 
    }

    // ... inside handleSendMessage ...
    const userMessage: ChatMessage = {
      id: SessionStorage.generateId(), // Use a more robust ID
      text,
      isUser: true,
      timestamp: new Date(),
    };

    if (!isRetry) {
      await saveMessageToActiveSession(userMessage);
    }
    
    setIsAISending(true);
    setCurrentError(null);

    const aiResponse: ChatResponse = await sendMessageToAI(text);
    setIsAISending(false);

    if (aiResponse.reply) {
      setLastFailedPrompt(null);
      const aiMessage: ChatMessage = {
        id: SessionStorage.generateId(), // Use a more robust ID
        text: aiResponse.reply,
        isUser: false,
        timestamp: new Date(),
        feedback: null,
        detailedFeedback: null,
      };
      await saveMessageToActiveSession(aiMessage);
    } else if (aiResponse.error) {
      setLastFailedPrompt(text);
      if (aiResponse.blocked) {
        setCurrentError(t('errorBlockedContent'));
      } else if (aiResponse.error.includes('Network request failed') || aiResponse.error.includes('network error')) {
        setCurrentError(t('errorNetwork'));
      } else {
        setCurrentError(t('errorApiGeneric'));
      }
    }
  }, [activeSessionId, saveMessageToActiveSession, t]);
  
  const handleRetry = () => {
    if (lastFailedPrompt) {
      // Don't add the user message again, just retry sending it.
      // We could also remove the previous error state from UI if desired,
      // or show a "Retrying..." state.
      // For simplicity, just call handleSendMessage with the failed prompt.
      // The original user message that failed is already in the messages list.
      console.log('Retrying prompt:', lastFailedPrompt);
      handleSendMessage(lastFailedPrompt, true); 
    }
  };
  
  const handleFeedback = (
    messageId: string | undefined, 
    type: 'liked' | 'disliked', 
    details?: { presets: string[]; comment: string }
  ) => {
    if (!messageId || !activeSessionId) {
      console.warn("Cannot handle feedback: no messageId or activeSessionId");
      return;
    }
    updateMessageFeedbackInActiveSession(messageId, type, details);
    // The context function now handles optimistic update and persistence.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MessageList messages={activeSessionMessages} onFeedback={handleFeedback} />
        {(isAISending || isLoadingSession) && <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIndicator} />}
        {currentError && !isAISending && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{currentError}</Text> 
            {lastFailedPrompt && (
              <Button title={t('retryButton', 'Retry')} onPress={handleRetry} />
            )}
          </View>
        )}
        <MessageInput 
          onSend={(text) => handleSendMessage(text, false)} 
          disabled={isAISending || isLoadingSession || !activeSessionId} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    // paddingHorizontal: 16, // MessageList might handle its own padding or bubbles have margins
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#FFD2D2',
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#D8000C',
    textAlign: 'center',
    marginBottom: 5,
  }
});

export default ChatScreen;
