import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  // We can add more props later, like feedback status, retry options, etc.
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser, timestamp }) => {
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.aiContainer
    ]}>
      <Text style={[
        styles.text,
        isUser ? styles.userText : styles.aiText
      ]}>
        {text}
      </Text>
      <Text style={[
        styles.timestamp,
        isUser ? styles.userTimestamp : styles.aiTimestamp
      ]}>
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 5, // Increased margin for better separation
    paddingHorizontal: 14, // Adjusted padding
    paddingVertical: 10,  // Adjusted padding
    borderRadius: 18,    // Slightly more rounded
    shadowColor: '#000', // Adding subtle shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1, // For Android shadow
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Standard iOS blue for user
    marginRight: 8, // Add some margin to the right
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9EB', // Standard iOS light gray for AI/others
    marginLeft: 8, // Add some margin to the left
  },
  text: {
    fontSize: 16,
    lineHeight: 22, // Adjusted for better readability, especially for Thai
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7, // Make timestamp slightly less prominent
  },
  userTimestamp: {
    alignSelf: 'flex-end',
    color: '#FFFFFF',
  },
  aiTimestamp: {
    alignSelf: 'flex-end',
    color: '#3C3C43', // Darker gray for AI timestamp for better contrast on light bubble
  }
});

export default MessageBubble;
