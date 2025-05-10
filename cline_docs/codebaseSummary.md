# Codebase Summary: KhaRom MVP (Post SDK 53 Upgrade & Core Chat Flow)

This document provides a high-level overview of the KhaRom MVP project structure and will be updated as development progresses.

## Project Structure Overview
The project is structured as a monorepo with distinct applications/packages.
- **`mobile-app/`**: Contains the React Native (Expo SDK 53, Bare workflow) mobile application. This is the primary frontend. ESLint and Prettier are configured.
- **`api-server/`**: Contains the Next.js (v15.3.2) application for the backend API proxy. ESLint and Prettier are configured.
- **Root Level**: Contains documentation (`cline_docs/`, `memory-bank/`), configuration (`.clinerules/`), and the main `README.md`.

**Interpreted Project Structure (based on `.clinerules/clinerules.md` and current setup):**
```
/mobile-app/            # React Native Expo SDK 53 project
  /src/
    /components/        # Reusable UI components
    /services/          # API service integration
    /screens/           # (Planned, ChatScreen currently in components)
    /navigation/        # (Planned)
    /hooks/             # (Planned)
    /constants/         # (Planned)
    /locales/           # (Planned for i18next)
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
-   **`App.tsx`:** Root component. Initializes `SafeAreaProvider` and renders `ChatScreen`.
-   **Components (`/src/components`):**
    -   `ChatScreen.tsx`: Main screen container. Manages message state (user and AI messages), handles sending messages via `GeminiApiService`, displays loading indicators, and basic error messages. Renders `MessageList` and `MessageInput`.
    -   `MessageList.tsx`: Displays a list of messages (`user` or `ai` type) using `FlatList`. Renders `MessageBubble` for each message. Receives `onFeedback` prop and passes it to `MessageBubble`.
    -   `MessageBubble.tsx`: Styles and displays individual chat messages. Shows sender (User/AI), text. For AI messages, displays thumbs-up/down SVG icons and calls `onFeedback` prop when icons are pressed.
    -   `MessageInput.tsx`: Provides a multiline text input field and a send button. Calls `onSend` prop (connected to `ChatScreen.tsx`) when the send button is pressed. UI is disabled when `disabled` prop (loading state from `ChatScreen`) is true. Uses `@expo/vector-icons` for the send icon.
-   **Services (`/src/services`):**
    -   `GeminiApiService.ts`: Encapsulates logic for making API calls to the Next.js backend proxy (`/api/chat`). Handles request formatting (sending prompt) and parsing the response (reply or error).

### Next.js API Proxy (`api-server/src/app/api/`)
-   **`chat/route.ts`:**
    -   Handles POST requests from the React Native app.
    -   Securely calls the Google Gemini API (`gemini-1.5-flash-latest`) with the user's prompt.
    -   Manages the Gemini API key (via `process.env.GEMINI_API_KEY`).
    -   Includes comprehensive error handling (type guards, HTTP status mapping, content safety checks).
    -   Returns the AI-generated Thai response or a structured error.
    -   (To be updated with `systemInstruction` for KhaRom persona).

## Data Flow (Implemented for Core Chat)
1.  **User Input:** User types a message in `MessageInput.tsx` (within `ChatScreen.tsx`).
2.  **Send Action:** User presses send button. `MessageInput.tsx` calls `onSend` prop.
3.  **Local Update & API Request:** `ChatScreen.tsx`'s `handleSendMessage` function:
    *   Adds the user's message to the local message state.
    *   Sets a loading state (disabling `MessageInput.tsx`).
    *   Calls `GeminiApiService.sendMessageToAI(prompt)`.
4.  **Backend Processing:** `GeminiApiService.ts` sends a POST request to the Next.js `/api/chat` endpoint. The `chat/route.ts` on the server then calls the Google Gemini API.
5.  **API Response:** Gemini returns a response. The Next.js server relays this (or an error) back to `GeminiApiService.ts`.
6.  **UI Update:** `ChatScreen.tsx` receives the response (reply or error) from the service.
    *   If successful, adds the AI's message to the local message state.
    *   If error, displays a basic error message.
    *   Clears the loading state.
    *   `MessageList.tsx` re-renders to display the new user and/or AI messages.

## External Dependencies
-   **Google Gemini API:** Core external service.
-   **Expo SDK 53 & related libraries:**
    -   `expo: "^53.0.0"`
    -   `react: "19.0.0"`
    -   `react-native: "0.79.2"`
    -   `expo-status-bar: "^2.2.3"` (or as per `npx expo install --fix`)
    -   `react-native-safe-area-context`
    -   `react-native-svg`
    -   `@expo/vector-icons`
-   **Next.js & related libraries (in `api-server/`):**
    -   `next: "15.3.2"`
    -   `@google/generative-ai: "^0.3.0"` (or latest compatible)
-   **ESLint & Prettier (Dev Dependencies):** Configured in both projects.

## Recent Significant Changes
-   **2025-05-11 (Git Merge):**
    -   `sdk-53-upgrade` branch merged into `main`.
-   **2025-05-10 (Core Chat Flow Implementation - Phase 2):**
    -   Implemented `GeminiApiService.ts`.
    -   Updated `ChatScreen.tsx` for message state management, API calls, loading/error handling.
    -   Modified `MessageInput.tsx` and `MessageList.tsx` to integrate with `ChatScreen.tsx`.
    -   Refined `MessageBubble.tsx` with SVG feedback icons and `onFeedback` prop.
    -   Successfully tested core chat send/receive functionality.
-   **2025-05-10 (Dependency Management & Integration - Phase 2):**
    -   Successfully integrated `react-native-safe-area-context`.
    -   Used `react-native-svg` for icons.
    -   Deferred integration of `react-native-gesture-handler` and `react-native-reanimated`.
-   **2025-05-10 (SDK 53 Upgrade - Phase 2):**
    -   Successfully upgraded `mobile-app` to Expo SDK 53.
-   **2025-05-10 (Phase 1 Completion):**
    -   Completed and deployed Next.js API proxy for Gemini.
    -   Production API endpoint: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`.

## User Feedback Integration and Its Impact on Development
-   Thumbs-up/down icons are present in `MessageBubble.tsx`.
-   Full logic for handling this feedback (e.g., visual state change, logging) is part of Phase 4.

## Additional Documentation References
-   `cline_docs/projectRoadmap.md`
-   `cline_docs/techStack.md`
-   `memory-bank/*` (all files for detailed context)
