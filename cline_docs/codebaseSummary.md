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
    /screens/           # Includes ChatHistoryScreen.tsx
    /navigation/
    /hooks/
    /services/          # Includes SessionStorageService.ts
    /constants/
    /locales/
    /context/           # Includes SessionContext.tsx
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
-   **`App.tsx`:** Root component. Initializes `GestureHandlerRootView`, `SafeAreaProvider`, `I18nextProvider`, `LanguageProvider`, `SessionProvider` (new), and `BottomSheetModalProvider`. Renders `AppNavigator`. (Updated 2025-05-11 for SessionProvider)
-   **Navigation (`/src/navigation`):**
    -   `AppNavigator.tsx`: (Updated 2025-05-11 for Chat History) Contains `NavigationContainer` and `Drawer.Navigator`.
        -   Includes `ChatScreen` and new `ChatHistoryScreen`.
        -   `CustomDrawerContent` now provides language toggle, "New Chat" action (uses `SessionContext`), and lists navigable screens including "Chat History".
-   **Screens (`/src/screens`):**
    -   `ChatHistoryScreen.tsx`: (New 2025-05-11) Displays a list of saved chat sessions. Allows users to select a session to continue, rename sessions (via Alert.prompt), and delete sessions (with confirmation) using swipe-to-reveal actions. Includes a FAB to create new sessions. Uses `SessionContext`.
-   **Contexts (`/src/context`):**
    -   `LanguageContext.tsx`: Manages UI language (EN/TH), persists to AsyncStorage.
    -   `SessionContext.tsx`: (New 2025-05-11) Manages the state of chat sessions, including the list of session summaries, the active session ID, and its messages. Provides functions to create, load, save, update (rename, message feedback), and delete sessions, interacting with `SessionStorageService.ts`.
-   **Components (`/src/components`):**
    -   `ChatScreen.tsx`: (Updated 2025-05-11 for SessionContext) Main chat interface. Now session-aware:
        -   Displays messages from the `activeSessionMessages` provided by `SessionContext`.
        -   Saves new user and AI messages to the active session via `saveMessageToActiveSession` from context.
        -   Handles initial load by creating a new session via context if none is active.
        -   Message feedback (`handleFeedback`) is now persisted to the active session via `updateMessageFeedbackInActiveSession` from context.
    -   `MessageList.tsx`: Displays messages. Receives `activeSessionMessages`.
    -   `MessageBubble.tsx`: Displays individual messages and feedback UI.
    -   `MessageInput.tsx`: Provides text input; disabled state now considers session status.
-   **Services (`/src/services`):**
    -   `ChatApiService.ts`: Defines `ChatMessage`, `ChatResponse`, `ChatSession` (new), `SessionSummary` (new) interfaces. Handles API calls to OpenRouter.
    -   `SessionStorageService.ts`: (New 2025-05-11) Provides utility functions to perform CRUD operations on chat sessions and their summaries using `AsyncStorage`.
-   **Hooks (`/src/hooks`):** (No new custom hooks specifically for chat history in this iteration, but `useSession` is a new context hook).
-   **Localization (`/src/localization` and `/src/locales`):**
    -   `i18n.ts`: Configures i18next.
    -   `en.json`, `th.json`: (Updated 2025-05-11) Include new keys for chat history features (e.g., "Chat History", "New Chat", "Rename", "Delete", alert messages).
-   **Constants (`/src/constants`):** (No significant changes for chat history in this iteration)
    -   `apiConfig.ts`: Base URL for the Next.js API.
    -   `colors.ts`, `typography.ts`: Theme-related constants.

### Next.js API Proxy (`/src/app/api` within Next.js project)
-   **`chat/route.ts`:**
    -   **Status:** Updated to use OpenRouter (Task X.3 completed 2025-05-11).
    -   Handles POST requests from the React Native app.
    -   Securely calls the OpenRouter API (via OpenAI SDK) with the user's prompt.
    -   Manages the OpenRouter API key and uses the default model specified in environment variables (currently `qwen/qwen2-7b-instruct`).
    -   Returns AI response or error.

## Data Flow (Updated for Chat History - 2025-05-11)
1.  **App Load / Initial Chat:**
    -   `SessionProvider` loads session summaries from `AsyncStorage` via `SessionStorageService`.
    -   `ChatScreen`, if no active session, calls `createNewSession` from `SessionContext`.
    -   `SessionContext` uses `SessionStorageService` to create and save a new session (e.g., "New Chat [timestamp]") and sets it active.
2.  **Sending a Message:**
    -   User types in `MessageInput` on `ChatScreen`.
    -   `handleSendMessage` calls `saveMessageToActiveSession` (context) with the user message.
    -   Context updates `activeSessionMessages` (optimistic UI) and calls `SessionStorageService.saveChatSession` to persist the user message to the current session.
    -   `handleSendMessage` calls `ChatApiService.sendMessageToAI`.
    -   On AI response, `handleSendMessage` calls `saveMessageToActiveSession` (context) with the AI message.
    -   Context updates `activeSessionMessages` and persists the AI message. `SessionStorageService.saveChatSession` also updates the session's `updatedAt` and its summary (including `lastMessageSnippet`).
3.  **Viewing Chat History:**
    -   User opens drawer, taps "Chat History".
    -   `AppNavigator` navigates to `ChatHistoryScreen`.
    -   `ChatHistoryScreen` uses `useSession` to get and display `sessions` (summaries).
4.  **Selecting/Continuing a Session:**
    -   User taps a session in `ChatHistoryScreen`.
    -   `handleSelectSession` calls `selectSession(sessionId)` from context.
    -   `SessionContext` fetches the full session via `SessionStorageService.getChatSession`, updates `activeSessionId` and `activeSessionMessages`.
    -   User is navigated to `ChatScreen` (typically by drawer closing and focusing 'Chat' screen), which now displays the selected session's messages. Conversation continues as in step 2.
5.  **Managing Sessions (Rename/Delete from `ChatHistoryScreen`):**
    -   User swipes a session item, taps "Rename" or "Delete".
    -   `handleRename` shows `Alert.prompt`, then calls `renameSession(sessionId, newTitle)` from context.
    -   `handleDelete` shows `Alert.alert`, then calls `deleteSession(sessionId)` from context.
    -   Context functions use `SessionStorageService` to update/delete data and then refresh the `sessions` summaries list.
6.  **Message Feedback:**
    -   User gives feedback in `MessageBubble` on `ChatScreen`.
    -   `handleFeedback` calls `updateMessageFeedbackInActiveSession` from context.
    -   Context updates the specific message's feedback in `activeSessionMessages`, then uses `SessionStorageService` to save the entire updated session, which also updates the session's `updatedAt` and summary.

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
-   **2025-05-11 (Phase C: Session-Based Chat History):**
    -   Implemented session storage (`SessionStorageService.ts`) using `AsyncStorage`.
    -   Created `SessionContext.tsx` for session state management.
    -   Developed `ChatHistoryScreen.tsx` with list display, swipe actions (rename/delete), and FAB for new chat.
    -   Integrated chat history into `AppNavigator.tsx` (drawer).
    -   Refactored `ChatScreen.tsx` to be session-aware.
    -   Added localization for new features.
-   **2025-05-11 (Phase 3.4 Hamburger Menu & Phase 4 UX Feedback - Earlier):**
    -   Implemented Drawer navigation with language toggle.
    -   Implemented thumbs-up/down feedback with detailed input via BottomSheet in `MessageBubble.tsx`.
    -   Implemented retry mechanism in `ChatScreen.tsx`.
    -   Localized error messages and new UI elements.
    -   Updated `App.tsx` with `GestureHandlerRootView` and `BottomSheetModalProvider`.
    -   Updated `ChatMessage` interface, `ChatScreen.tsx` (message prepending for inverted list), `MessageList.tsx`, `MessageBubble.tsx`, `locales/*.json`.
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
-   Thumbs-up/down and detailed feedback on AI replies are implemented.
-   This feedback data is now persisted as part of the `ChatMessage` objects within the saved chat sessions in `AsyncStorage` (via `SessionContext` and `SessionStorageService`).
-   Retry mechanism allows users to overcome transient errors. Localized error messages improve UX.

## Additional Documentation References
-   `cline_docs/projectRoadmap.md`
-   `cline_docs/techStack.md`
-   `memory-bank/*` (all files for detailed context)
-   *(Future documents like `styleAesthetic.md` or `wireframes.md` will be listed here if created).*
