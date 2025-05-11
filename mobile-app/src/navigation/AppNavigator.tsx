import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'; // useNavigation removed as props.navigation is used
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import { Ionicons } from '@expo/vector-icons'; 
import ChatScreen from '../components/ChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen'; // Import ChatHistoryScreen
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext'; // Import useSession
import { useTranslation } from 'react-i18next';
// View and Text are not used if AboutScreen placeholder is removed
// import { View, Text } from 'react-native'; 

const Drawer = createDrawerNavigator();

// Placeholder for a potential "About" screen
// const AboutScreen = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>KhaRom - AI Dating Buddy</Text>
//     <Text>Version 1.0.0 (MVP)</Text>
//   </View>
// );

function CustomDrawerContent(props: DrawerContentComponentProps) { // Typed props
  const { language, setLanguage } = useLanguage();
  const { createNewSession } = useSession();
  const { t } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = language === 'en' ? 'th' : 'en';
    setLanguage(newLang);
    // props.navigation.closeDrawer(); // Removed to keep drawer open
  };

  const handleNewChat = async () => {
    const newSessionId = await createNewSession();
    if (newSessionId) {
      props.navigation.navigate('Chat'); 
    }
    props.navigation.closeDrawer();
  };

  const currentLanguageLabel = language === 'en' ? t('switchToThai', 'Switch to Thai') : t('switchToEnglish', 'Switch to English');

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} /> 
      {/* "Chat History" will be listed here if added to Navigator screens */}
      <DrawerItem
        label={t('newChat', 'New Chat')}
        icon={({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />}
        onPress={handleNewChat}
      />
      <DrawerItem
        label={currentLanguageLabel}
        icon={({ color, size }) => <Ionicons name="language-outline" size={size} color={color} />}
        onPress={handleToggleLanguage}
      />
    </DrawerContentScrollView>
  );
}


export default function AppNavigator() {
  const { t } = useTranslation();
  const { activeSessionId, sessions } = useSession(); // Get session data for dynamic title

  // Calculate the chat screen title based on active session
  let chatScreenTitle = t('chat', 'Chat'); // Default title
  if (activeSessionId && sessions) {
    const activeSession = sessions.find(s => s.id === activeSessionId);
    if (activeSession) {
      if (activeSession.hasCustomTitle) {
        // If session has been renamed, always use the custom title
        chatScreenTitle = activeSession.title;
      } else {
        // Otherwise, use snippet or fall back to default title
        chatScreenTitle = activeSession.lastMessageSnippet || activeSession.title || t('chat', 'Chat');
      }
    }
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Chat"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          // Common screen options for all drawer screens if needed
        }}
      >
        <Drawer.Screen
          name="Chat"
          component={ChatScreen}
          options={({ navigation }) => ({ 
            title: chatScreenTitle, // Use dynamic title based on active session
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Ionicons name="menu" size={28} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Drawer.Screen
          name="ChatHistory"
          component={ChatHistoryScreen}
          options={{ 
            title: t('chatHistory', 'Chat History'), // Default value for t
            // headerLeft can be customized if needed, or defaults to drawer toggle
          }}
        />
        {/* <Drawer.Screen name="About" component={AboutScreen} options={{ title: t('about') }} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
