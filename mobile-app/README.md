# KhaRom Mobile Application (React Native - Expo)

This directory contains the React Native (Expo SDK 53) mobile application for the KhaRom project. This is the user-facing client application.

## ✨ Features (MVP)
-   AI-Powered Chat Interface (receives Thai-only AI responses).
-   Session-Based Chat History with persistent storage.
-   Multiple chats with rename and delete capabilities.
-   UI Language Toggle (Thai/English) via drawer menu.
-   Robust UX Feedback (Error handling, retries, thumbs-up/down for AI replies).
-   Primary testing and compatibility focus on Expo Go for iOS.

## 🛠️ Tech Stack
-   **Framework:** React Native (Expo SDK 53)
-   **Language:** TypeScript
-   **Styling:** React Native `StyleSheet` API
-   **Icons:** `@expo/vector-icons`
-   **Key Libraries:**
    - `react-native-safe-area-context`
    - `react-native-gesture-handler`
    - `react-native-reanimated`
    - `@gorhom/bottom-sheet`
-   **Navigation:** React Navigation (Drawer)
-   **Localization:** i18next with React Context
-   **State Management:** React Context API (`SessionContext`, `LanguageContext`)
-   **Data Persistence:** AsyncStorage for sessions and settings

## 🚀 Getting Started

### Prerequisites
-   Node.js (LTS version recommended)
-   npm or yarn
-   Expo CLI (`npm install -g expo-cli`)
-   An iOS device with the Expo Go app installed for previewing.
-   Ensure your development machine and your iOS device are on the **same Wi-Fi network** for reliable Expo Go connection.

### Setup Instructions

1.  **Navigate to the `mobile-app` directory:**
    ```bash
    cd mobile-app
    # (If you are in the project root)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    # or
    # yarn start
    # or
    # expo start
    ```

4.  **Open in Expo Go:**
    -   Once the Metro Bundler starts, you will see a QR code in the terminal.
    -   Open the Expo Go app on your iOS device and scan the QR code.
    -   Alternatively, if you have an Expo account and are logged in on both your CLI and Expo Go, the project might appear automatically in the "Recently in Development" section of Expo Go.

## ⚙️ Configuration
-   **ESLint & Prettier:** Configured for code linting and formatting. Use `npm run lint` or `npm run lint:fix`.
-   **TypeScript:** Strict mode enabled.
-   **Expo Configuration:** `app.json` contains project-specific settings for Expo.

## 📁 Key Directories (within `mobile-app/src/`)
-   **`components/`:** Reusable UI components (`ChatScreen.tsx`, `MessageBubble.tsx`, `MessageInput.tsx`, `MessageList.tsx`).
-   **`screens/`:** Screen components (`ChatHistoryScreen.tsx`).
-   **`navigation/`:** React Navigation setup (`AppNavigator.tsx`).
-   **`services/`:** Service modules (`ChatApiService.ts`, `SessionStorageService.ts`).
-   **`context/`:** Context providers (`SessionContext.tsx`, `LanguageContext.tsx`).
-   **`locales/`:** i18next translation files (`en.json`, `th.json`).
-   **`localization/`:** i18next configuration (`i18n.ts`).

## 🤝 Contributing
Refer to the main project `README.md` in the root directory for overall project contribution guidelines.
