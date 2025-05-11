import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '../services/ChatApiService'; // Updated import path

interface MessageListProps {
  messages: ChatMessage[];
  onFeedback: (
    messageId: string | undefined, 
    type: 'liked' | 'disliked',
    details?: { presets: string[]; comment: string } 
  ) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onFeedback }) => {
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            messageId={item.id}
            text={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
            feedback={item.feedback} // Pass feedback state
            detailedFeedback={item.detailedFeedback} // Pass detailed feedback
            onFeedback={onFeedback}
          />
        )}
        // inverted prop removed to display messages top-to-bottom
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })} // Ensure scroll on initial load/size change
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })} // Ensure scroll on layout change
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8, // Space for MessageInput. Adjusted from 16 to 8 as MessageInput has its own padding.
  },
  listContent: {
    paddingVertical: 8,
  },
  // Placeholder styles for MessageBubble are removed as MessageBubble.tsx now handles its own styling.
});

export default MessageList;
