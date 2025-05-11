import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n'; // Import the configured i18n instance
import { LanguageProvider } from './src/context/LanguageContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Required for @gorhom/bottom-sheet

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
// import ChatScreen from './src/components/ChatScreen'; // No longer directly rendered here
import AppNavigator from './src/navigation/AppNavigator'; // Import the AppNavigator

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <BottomSheetModalProvider>
              {/* AppNavigator contains its own NavigationContainer */}
              <AppNavigator />
              <StatusBar style="auto" />
            </BottomSheetModalProvider>
          </LanguageProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// The styles.container might not be necessary anymore if AppNavigator's NavigationContainer handles layout.
// Keeping it for now, can be removed if AppNavigator fills the screen as expected.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
