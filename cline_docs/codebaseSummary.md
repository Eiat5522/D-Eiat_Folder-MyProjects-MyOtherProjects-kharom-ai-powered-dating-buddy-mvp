# Codebase Summary: KhaRom MVP (Post OpenRouter Integration)

This document provides a high-level overview of the KhaRom MVP project structure and will be updated as development progresses.

## Project Structure Overview
The project is structured as a monorepo with distinct applications/packages.
- **`mobile-app/`**: Contains the React Native (Expo SDK 53, Bare workflow) mobile application. This is the primary frontend. ESLint and Prettier are configured.
- **`api-server/`**: Contains the Next.js (v15.3.2) application for the backend API proxy (now using OpenRouter). ESLint and Prettier are configured.
- **Root Level**: Contains documentation (`cline_docs/`, `memory-bank/`), configuration (`.clinerules/`), and the main `README.md`.

**Interpreted Project Structure (based on `.clinerules/clinerules.md` and current setup):**
```
/mobile-app/            # React Native Expo SDK 53 project
  /src/
    /components/
    /screens/
    /navigation/
    /hooks/
    /services/
    /constants/
    /locales/
  /assets/
  App.tsx
  package.json
  .eslintrc.js
  .prettierrc.js
  ...
/api-server/            # Next.js API project (v15.3.2)
  /src/
    /app/api/           # Next.js API Routes (e.g., /chat)
  package.json
  eslint.config.mjs
  .prettierrc.js
  ...
/cline_docs/
/memory-bank/
/.clinerules/
README.md
...
```

## Key Components and Their Interactions

### React Native Mobile App (`mobile-app/` - Expo SDK 53)
-   **`App.tsx`:** Root component. Initializes `GestureHandlerRootView`, `SafeAreaProvider`, `I18nextProvider`, `LanguageProvider`, and `BottomSheetModalProvider`. Renders `AppNavigator`. (Updated 2025-05-11)
-   **Navigation (`/src/navigation`):** (Implemented 2025-05-11)
    -   `AppNavigator.tsx`: Contains `NavigationContainer` and `Drawer.Navigator`.
        -   Includes `ChatScreen`.
        -   `CustomDrawerContent` provides a language toggle item.
        -   `ChatScreen` header has a hamburger icon to toggle the drawer.
-   **Screens (`/src/screens`):** (Still primarily `ChatScreen` in `/src/components/`)
-   **Contexts (`/src/context`):**
    -   `LanguageContext.tsx`: Manages UI language (EN/TH), persists to AsyncStorage.
-   **Components (`/src/components`):**
    -   `ChatScreen.tsx`: (Updated 2025-05-11) Main screen. Manages messages (now prepended for correct inverted list order), API calls, loading/error states (localized), retry logic, and feedback handling.
    -   `MessageList.tsx`: (Updated 2025-05-11) Displays messages using `inverted` FlatList. Passes `feedback` state and updated `onFeedback` (with details) to `MessageBubble`.
    -   `MessageBubble.tsx`: (Updated 2025-05-11) Displays individual messages. Shows feedback state. Integrates `@gorhom/bottom-sheet` for detailed feedback on "dislike".
    -   `MessageInput.tsx`: Provides text input and send button. Uses translated placeholder.
-   **Services (`/src/services`):**
    -   `ChatApiService.ts`: (Updated 2025-05-11) `ChatMessage` interface now includes `feedback` and `detailedFeedback` fields. Handles API calls to OpenRouter.
-   **Hooks (`/src/hooks`):** (No new custom hooks added in this iteration)
-   **Localization (`/src/localization` and `/src/locales`):**
    -   `i18n.ts`: Configures i18next.
    -   `en.json`, `th.json`: (Updated 2025-05-11) Include new keys for drawer, feedback UI, and error messages.
-   **Constants (`/src/constants`):** (No changes in this iteration)
    -   `apiConfig.ts`: Base URL for the Next.js API.
    -   `colors.ts`, `typography.ts`: Theme-related constants.

### Next.js API Proxy (`/src/app/api` within Next.js project)
-   **`chat/route.ts`:**
    -   **Status:** Updated to use OpenRouter (Task X.3 completed 2025-05-11).
    -   Handles POST requests from the React Native app.
    -   Securely calls the OpenRouter API (via OpenAI SDK) with the user's prompt.
    -   Manages the OpenRouter API key and uses the default model specified in environment variables (currently `qwen/qwen2-7b-instruct`).
    -   Returns AI response or error.

## Data Flow (Updated for OpenRouter, Feedback, Retry & Corrected Order)
1.  **User Input:** User types message in `MessageInput`.
2.  **API Request:** `ChatScreen.handleSendMessage` prepends user message to state, calls `ChatApiService.sendMessageToAI`.
3.  **Backend Processing:** Next.js API proxies to OpenRouter.
4.  **API Response:** OpenRouter responds; Next.js relays.
5.  **UI Update:**
    -   Success: `ChatScreen` prepends AI message (with `feedback: null`) to state.
    -   Error: `ChatScreen` sets localized error state and `lastFailedPrompt`. "Retry" button appears.
6.  **User Feedback (AI Message):**
    -   User taps thumbs-up/down on `MessageBubble`.
    -   `liked`: `onFeedback` called, `ChatScreen` updates message's `feedback` state.
    -   `disliked`: `MessageBubble` opens bottom sheet. User provides details. On submit, `onFeedback` called with details, `ChatScreen` updates message's `feedback` and `detailedFeedback`.
7.  **Retry:** User taps "Retry". `ChatScreen.handleRetry` calls `handleSendMessage` with `lastFailedPrompt`.

## External Dependencies
-   **OpenRouter API**
-   **React Navigation:** (`@react-navigation/native`, `@react-navigation/drawer`) (Installed 2025-05-11)
-   **Gesture Handler & Reanimated:** (`react-native-gesture-handler`, `react-native-reanimated`) (Installed 2025-05-11)
-   **Bottom Sheet:** (`@gorhom/bottom-sheet`) (Installed 2025-05-11)
-   **i18next & react-i18next**
-   **@react-native-async-storage/async-storage**
-   **Expo SDK 53 & related libraries:**
    -   `expo`, `react`, `react-native`, `expo-status-bar`
    -   `react-native-safe-area-context`
    -   `react-native-svg`
    -   `@expo/vector-icons`
-   **Next.js & related libraries (in `api-server/`):**
    -   `next: "15.3.2"`
    -   `react: "^19.0.0"`
    -   `typescript: "^5"`
    -   `tailwindcss`, `openai`
-   **ESLint & Prettier**

## Development Tooling
-   **Linters & Formatters:** ESLint & Prettier configured for both projects.

## Recent Significant Changes
-   **2025-05-11 (Phase 3.4 Hamburger Menu & Phase 4 UX Feedback):**
    -   Implemented Drawer navigation with language toggle.
    -   Implemented thumbs-up/down feedback with detailed input via BottomSheet in `MessageBubble.tsx`.
    -   Implemented retry mechanism in `ChatScreen.tsx`.
    -   Localized error messages and new UI elements.
    -   Updated `App.tsx` with `GestureHandlerRootView` and `BottomSheetModalProvider`.
    -   Updated `ChatMessage` interface, `ChatScreen.tsx` (message prepending), `MessageList.tsx`, `MessageBubble.tsx`, `locales/*.json`.
-   **2025-05-11 (Model Change & Documentation Update - Earlier):**
    -   Default OpenRouter model changed to `qwen/qwen2-7b-instruct`.
    -   Relevant documentation updated.
-   **2025-05-11 (Phase 3 Localization - Earlier):**
    -   Initial i18next setup, `LanguageContext`, and basic toggle.
-   **2025-05-11 (OpenRouter Integration & Training Data Scraping - Earlier):**
    -   Migrated backend to OpenRouter (initially with `mistralai/mistral-small-24b-instruct-2501`), tested.
    -   Scraped training data.
-   **2025-05-10 & Earlier (Project Setup, Core Chat, SDK Upgrade, Gemini API - Earlier):**
    -   Initial project scaffolding, documentation, core chat UI, SDK 53 upgrade, and original Gemini API proxy.

## User Feedback Integration and Its Impact on Development
-   Thumbs-up/down and detailed feedback on AI replies are now implemented (local state for MVP).
-   This data is structured within the `ChatMessage` objects in `ChatScreen.tsx` state.
-   Future development can focus on sending this collected feedback to a backend endpoint for analysis and model fine-tuning.
-   Retry mechanism allows users to overcome transient errors. Localized error messages improve UX.

## Additional Documentation References
-   `cline_docs/projectRoadmap.md`
-   `cline_docs/techStack.md`
-   `memory-bank/*` (all files for detailed context)
-   *(Future documents like `styleAesthetic.md` or `wireframes.md` will be listed here if created).*
