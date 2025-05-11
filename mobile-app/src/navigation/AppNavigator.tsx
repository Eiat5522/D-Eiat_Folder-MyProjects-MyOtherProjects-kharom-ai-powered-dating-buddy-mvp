import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // For the button
import { Ionicons } from '@expo/vector-icons'; // For the menu icon
import ChatScreen from '../components/ChatScreen';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native'; // For placeholder AboutScreen, if used

const Drawer = createDrawerNavigator();

// Placeholder for a potential "About" screen
// const AboutScreen = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>KhaRom - AI Dating Buddy</Text>
//     <Text>Version 1.0.0 (MVP)</Text>
//   </View>
// );

function CustomDrawerContent(props: any) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = language === 'en' ? 'th' : 'en';
    setLanguage(newLang);
    // Optionally close the drawer after selection
    // props.navigation.closeDrawer(); 
  };

  const currentLanguageLabel = language === 'en' ? t('switchToThai') : t('switchToEnglish');

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={currentLanguageLabel}
        onPress={handleToggleLanguage}
      />
    </DrawerContentScrollView>
  );
}


export default function AppNavigator() {
  const { t } = useTranslation();
  // Note: The LanguageProvider and I18nextProvider are already in App.tsx,
  // so hooks like useLanguage and useTranslation can be used here if AppNavigator
  // is rendered within those contexts.

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Chat"
        drawerContent={(props) => <CustomDrawerContent {...props} />} 
      >
        <Drawer.Screen
          name="Chat"
          component={ChatScreen}
          options={({ navigation }) => ({ // options can be a function
            title: t('chat'),
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
        {/* <Drawer.Screen name="About" component={AboutScreen} options={{ title: t('about') }} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
