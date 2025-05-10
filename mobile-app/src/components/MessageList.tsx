import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const MessageList: React.FC = () => {
  // Temporary mock data - will be replaced with actual data later
  const messages: Message[] = [
    { id: '1', text: 'Hello!', isUser: true, timestamp: new Date() },
    { id: '2', text: 'Hi there! How can I help you today?', isUser: false, timestamp: new Date(Date.now() + 1000) },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
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
