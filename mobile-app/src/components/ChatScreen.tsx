import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MessageList />
        <MessageInput />
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
    paddingHorizontal: 16,
  },
});

export default ChatScreen;
