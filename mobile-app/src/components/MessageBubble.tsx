import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Using react-native-svg

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  messageId?: string;
  onFeedback?: (messageId: string | undefined, type: 'up' | 'down') => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  text, 
  isUser, 
  timestamp, 
  messageId, 
  onFeedback 
}) => {
  const handleFeedback = (type: 'up' | 'down') => {
    if (onFeedback) {
      onFeedback(messageId, type);
    }
  };

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
      
      <View style={styles.footer}>
        <Text style={[
          styles.timestamp,
          isUser ? styles.userTimestamp : styles.aiTimestamp
        ]}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        
        {/* Feedback buttons only for AI messages */}
        {!isUser && onFeedback && (
          <View style={styles.feedbackContainer}>
            <TouchableOpacity 
              style={styles.feedbackButton} 
              onPress={() => handleFeedback('up')}
              accessibilityLabel="Thumbs up"
            >
              <Svg height="16" width="16" viewBox="0 0 24 24">
                <Path fill={styles.aiTimestamp.color} d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.feedbackButton} 
              onPress={() => handleFeedback('down')}
              accessibilityLabel="Thumbs down"
            >
              <Svg height="16" width="16" viewBox="0 0 24 24">
                <Path fill={styles.aiTimestamp.color} d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
              </Svg>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Standard iOS blue for user
    marginRight: 8,
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9EB', // Standard iOS light gray for AI/others
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
  },
  userTimestamp: {
    color: '#FFFFFF',
  },
  aiTimestamp: {
    color: '#3C3C43',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackButton: {
    marginLeft: 8,
    padding: 2,
  }
});

export default MessageBubble;
