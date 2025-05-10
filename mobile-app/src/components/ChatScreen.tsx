import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ActivityIndicator, Button } from 'react-native';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToAI, ChatMessage, ChatResponse } from '../services/GeminiApiService'; // Adjusted path

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (text: string) => {
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(), // Simple ID generation
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);

    const aiResponse: ChatResponse = await sendMessageToAI(text);
    setIsLoading(false);

    if (aiResponse.reply) {
      const newAiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), // Simple ID generation
        text: aiResponse.reply,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
    } else if (aiResponse.error) {
      setError(aiResponse.error);
      // Optionally, add an error message to the chat list
      // const newErrorMessage: ChatMessage = {
      //   id: (Date.now() + 1).toString(),
      //   text: `Error: ${aiResponse.error}`,
      //   isUser: false, // Or a system message type
      //   timestamp: new Date(),
      // };
      // setMessages(prevMessages => [...prevMessages, newErrorMessage]);
    }
  }, []);
  
  // Placeholder for onFeedback, to be implemented with Task 4.1
  const handleFeedback = (messageId: string | undefined, type: 'up' | 'down') => {
    console.log(`Feedback for message ${messageId}: ${type}`);
    // TODO: Implement feedback submission logic if needed for MVP backend/logging
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MessageList messages={messages} onFeedback={handleFeedback} />
        {isLoading && <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIndicator} />}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Retry last prompt (not implemented)" onPress={() => console.log("Retry pressed - to be implemented")} />
          </View>
        )}
        <MessageInput onSend={handleSendMessage} disabled={isLoading} />
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
