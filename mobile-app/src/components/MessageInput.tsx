import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons is installed or available via Expo

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = () => {
    if (message.trim().length === 0) return;
    // TODO: Implement actual send message logic (e.g., call API service)
    console.log('Sending message:', message);
    setMessage('');
    setInputHeight(40); // Reset height after sending
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust offset as needed
    >
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { height: Math.max(40, inputHeight) }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#8E8E93"
          multiline
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          maxLength={500} // Example character limit
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            message.trim().length === 0 && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={message.trim().length === 0}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={message.trim().length === 0 ? '#8E8E93' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align items to bottom for multiline input
    paddingVertical: 8,
    paddingHorizontal: 12, // Added horizontal padding
    backgroundColor: '#F8F8F8', // Slightly off-white background
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D1D1D6', // Standard iOS separator color
  },
  input: {
    flex: 1,
    minHeight: 40, // Minimum height for single line
    maxHeight: 120, // Maximum height for multiline
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8, // Adjust padding for platform
    backgroundColor: '#FFFFFF', // White background for input
    borderRadius: 20,    // Standard iOS rounded input
    fontSize: 17,        // Standard iOS text size
    lineHeight: 22,      // Standard iOS line height
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D1D6',
  },
  sendButton: {
    marginLeft: 10, // Increased margin
    paddingBottom: Platform.OS === 'ios' ? 8 : 6, // Align with input text baseline
    paddingHorizontal: 8,
  },
  sendButtonDisabled: {
    opacity: 0.4, // More pronounced disabled state
  },
});

export default MessageInput;
