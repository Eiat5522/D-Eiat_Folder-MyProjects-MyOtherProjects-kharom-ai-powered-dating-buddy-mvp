import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../localization/i18n'; // Adjust path if your i18n instance is elsewhere

const ASYNC_STORAGE_LANG_KEY = 'appLanguage';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<string>(i18n.language || 'en');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(ASYNC_STORAGE_LANG_KEY);
        if (storedLanguage) {
          setCurrentLanguage(storedLanguage);
          if (i18n.language !== storedLanguage) {
            await i18n.changeLanguage(storedLanguage);
          }
        } else {
          // If no stored language, set default and store it
          await AsyncStorage.setItem(ASYNC_STORAGE_LANG_KEY, language);
        }
      } catch (error) {
        console.error('Failed to load language from AsyncStorage', error);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: string) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_LANG_KEY, newLanguage);
      setCurrentLanguage(newLanguage);
      if (i18n.language !== newLanguage) {
        await i18n.changeLanguage(newLanguage);
      }
    } catch (error) {
      console.error('Failed to save language to AsyncStorage', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
