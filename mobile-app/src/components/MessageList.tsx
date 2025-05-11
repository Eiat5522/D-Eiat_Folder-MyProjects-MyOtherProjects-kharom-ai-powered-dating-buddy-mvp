import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '../services/GeminiApiService'; // Import ChatMessage type

interface MessageListProps {
  messages: ChatMessage[];
  onFeedback: (messageId: string | undefined, type: 'up' | 'down') => void; // Add onFeedback prop
}

const MessageList: React.FC<MessageListProps> = ({ messages, onFeedback }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            messageId={item.id} // Pass messageId
            text={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
            onFeedback={onFeedback} // Pass onFeedback prop
          />
        )}
        inverted // To show latest messages at the bottom
        contentContainerStyle={styles.listContent}
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
