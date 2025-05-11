import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ActivityIndicator, Button } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToAI, ChatMessage, ChatResponse } from '../services/ChatApiService'; // Adjusted path

const ChatScreen: React.FC = () => {
  // const { language, setLanguage } = useLanguage(); // Language toggle is now in the drawer
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // This will store the key or the direct message
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null); // For retry
  const { t } = useTranslation(); // For translating error messages

  const handleSendMessage = useCallback(async (text: string, isRetry: boolean = false) => {
    // If it's not a retry, add the user message to the list.
    // If it is a retry, the user message is already in the list.
    if (!isRetry) {
      const newUserMessage: ChatMessage = {
        id: Date.now().toString(), // Simple ID generation
        text,
        isUser: true,
        timestamp: new Date(),
      };
      // Prepend new user message for inverted list
      setMessages(prevMessages => [newUserMessage, ...prevMessages]);
    }
    
    setIsLoading(true);
    setError(null);
    // setLastFailedPrompt(null); // Clear previous failed prompt before new attempt

    const aiResponse: ChatResponse = await sendMessageToAI(text);
    setIsLoading(false);

    if (aiResponse.reply) {
      setLastFailedPrompt(null); // Clear on success
      const newAiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), // Simple ID generation
        text: aiResponse.reply,
        isUser: false,
        timestamp: new Date(),
        feedback: null, // Initialize feedback fields
        detailedFeedback: null,
      };
      // Prepend new AI message for inverted list
      setMessages(prevMessages => [newAiMessage, ...prevMessages]);
    } else if (aiResponse.error) {
      setLastFailedPrompt(text); // Store the prompt that failed
      if (aiResponse.blocked) {
        setError(t('errorBlockedContent'));
      } else if (aiResponse.error.includes('Network request failed') || aiResponse.error.includes('network error')) { // Basic check
        setError(t('errorNetwork'));
      } else {
        setError(t('errorApiGeneric'));
      }
    }
  }, [t]); // Add t to dependency array
  
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
    if (!messageId) return;
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId && !msg.isUser) {
          if (type === 'disliked' && details) {
            return { ...msg, feedback: 'disliked', detailedFeedback: details };
          }
          // If liked, or disliked without details yet (e.g. just tapped thumb down before modal)
          // or if switching from liked to disliked or vice-versa, clear detailed feedback.
          return { ...msg, feedback: type, detailedFeedback: type === 'liked' ? null : msg.detailedFeedback };
        }
        return msg;
      })
    );
    console.log(`Feedback for message ${messageId}: ${type}`, details || '');
    // For MVP, feedback is local. Future: send to backend.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Removed temporary language toggle button */}
        <MessageList messages={messages} onFeedback={handleFeedback} />
        {isLoading && <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIndicator} />}
        {error && !isLoading && ( // Only show error if not currently loading (e.g. during a retry)
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text> 
            {lastFailedPrompt && ( // Show retry button only if there's a failed prompt
              <Button title={t('retryButton', 'Retry')} onPress={handleRetry} />
            )}
          </View>
        )}
        <MessageInput onSend={(text) => handleSendMessage(text, false)} disabled={isLoading} />
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
