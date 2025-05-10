# KhaRom Mobile Application (React Native - Expo)

This directory contains the React Native (Expo SDK 53) mobile application for the KhaRom project. This is the user-facing client application.

## ✨ Features (MVP)
-   AI-Powered Chat Interface (receives Thai-only AI responses).
-   UI Language Toggle (Thai/English).
-   Robust UX Feedback (Error handling, retries, thumbs-up/down for AI replies).
-   Primary testing and compatibility focus on Expo Go for iOS.

## 🛠️ Tech Stack
-   **Framework:** React Native (Expo Bare Workflow - SDK 53)
-   **Language:** TypeScript
-   **Styling:** React Native `StyleSheet` API
-   **Icons:** Inline SVGs with `react-native-svg`, `@expo/vector-icons`
-   **Key Libraries:** `react-native-safe-area-context`
-   **Navigation:** React Navigation (to be added)
-   **Localization:** i18next (to be added)
-   **State Management:** React Context API (initially), `useState`, `useReducer`.

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
-   **`screens/`:** (Planned) Top-level screen components.
-   **`navigation/`:** (Planned) React Navigation setup.
-   **`services/`:** API service modules (`GeminiApiService.ts`).
-   **`hooks/`:** (Planned) Custom React hooks.
-   **`locales/`:** (Planned) i18next translation files.
-   **`constants/`:** (Planned) App-wide constants.

## 🤝 Contributing
Refer to the main project `README.md` in the root directory for overall project contribution guidelines.
