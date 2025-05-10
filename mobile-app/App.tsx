import React from 'react';
import ChatScreen from './src/components/ChatScreen'; // Adjusted path
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <ChatScreen />
      <StatusBar style="auto" />
    </>
  );
}

// Original styles are not needed for ChatScreen as it handles its own layout.
// If a global container or theme provider is added later, styles might be reintroduced here.
