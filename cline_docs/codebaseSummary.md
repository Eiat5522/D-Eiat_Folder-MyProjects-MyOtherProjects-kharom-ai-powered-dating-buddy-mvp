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
-   **`App.tsx` (or main entry):** Root component, initializes `SafeAreaProvider` and renders `ChatScreen`.
-   **Navigation (`/src/navigation`):** (Planned, not yet implemented)
    -   `AppNavigator`: Manages screen transitions.
    -   Uses `react-navigation`.
-   **Screens (`/src/screens`):** (Planned, `ChatScreen` currently in `/src/components/`)
-   **Components (`/src/components`):**
    -   `ChatScreen.tsx`: (Updated 2025-05-10) Main screen container. Manages message state, API calls via `GeminiApiService` (to be renamed/refactored), loading/error states. Renders `MessageList` and `MessageInput`.
    -   `MessageList.tsx`: (Updated 2025-05-10) Displays a list of messages from props using `FlatList`. Renders `MessageBubble` for each message. Passes `onFeedback` to `MessageBubble`.
    -   `MessageBubble.tsx`: (Updated 2025-05-10) Styles and displays individual chat messages. Includes thumbs-up/down SVG icons for AI messages and calls `onFeedback` prop.
    -   `MessageInput.tsx`: (Updated 2025-05-10) Provides text input and send button. Calls `onSend` prop. UI disabled when `disabled` prop is true.
    -   (Planned) `LanguageToggle.tsx`.
    -   (Implemented within `ChatScreen.tsx`) Basic `ActivityIndicator` for loading.
-   **Services (`/src/services`):**
    -   `GeminiApiService.ts` (Soon to be renamed/refactored to `OpenRouterApiService.ts` or generic `ApiService.ts`): (Created 2025-05-10) Encapsulates logic for making API calls to the Next.js backend proxy (now OpenRouter).
-   **Hooks (`/src/hooks`):**
    -   `useLocalization.ts` (example): Custom hook to simplify access to i18next functions.
    -   `useApi.ts` (example): Generic hook for managing API call state (loading, error, data).
-   **Localization (`/src/locales`):**
    -   `en.json`, `th.json`: Store UI string translations.
-   **Constants (`/src/constants`):**
    -   `apiConfig.ts`: Base URL for the Next.js API.
    -   `colors.ts`, `typography.ts`: Theme-related constants.

### Next.js API Proxy (`/src/app/api` within Next.js project)
-   **`chat/route.ts`:**
    -   **Status:** Updated to use OpenRouter (Task X.3 completed 2025-05-11).
    -   Handles POST requests from the React Native app.
    -   Securely calls the OpenRouter API (via OpenAI SDK) with the user's prompt.
    -   Manages the OpenRouter API key (via environment variables `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL`).
    -   Returns the AI-generated Thai response or an error.

## Data Flow (Updated for OpenRouter)
1.  **User Input:** User types a message in `MessageInput` (within `ChatScreen`).
2.  **Local Update & API Request:** `ChatScreen`'s `handleSendMessage` adds user message to local state, sets loading state, then calls `GeminiApiService.sendMessageToAI` (service to be renamed).
3.  **Backend Processing:** API service sends POST to Next.js `/api/chat`. Next.js API calls OpenRouter using OpenAI SDK.
4.  **API Response:** OpenRouter returns response; Next.js relays to API service.
5.  **UI Update:** `ChatScreen` receives response/error from service. Adds AI message to state or sets error state. Loading state cleared. `MessageList` re-renders.

## External Dependencies
-   **OpenRouter API:** Core external service for AI text generation (via OpenAI SDK).
-   **React Navigation:** (Planned for future navigation).
-   **i18next & react-i18next:** (Planned for localization).
-   **Expo SDK 53 & related libraries:**
    -   `expo: "^53.0.0"`
    -   `react: "19.0.0"`
    -   `react-native: "0.79.2"`
    -   `expo-status-bar: "^2.2.3"`
    -   `react-native-safe-area-context` (version managed by `npx expo install`)
    -   `react-native-svg` (used for icons, `package.json` update was problematic but functionally working)
    -   `@expo/vector-icons` (used in `MessageInput`)
    -   (Other dependencies like `react-native-gesture-handler`, `react-native-reanimated` deferred)
-   **Next.js & related libraries (in `api-server/`):**
    -   `next: "15.3.2"`
    -   `react: "^19.0.0"`
    -   `typescript: "^5"`
    -   `tailwindcss: "^4"`
    -   `openai`: Node.js SDK for interacting with OpenRouter API (added to `api-server`).
-   **ESLint & Prettier (Dev Dependencies):** Configured in both `mobile-app` and `api-server` with relevant plugins for React Native, Next.js, TypeScript, and Tailwind CSS.

*(Other dependencies will be added as features are implemented.)*

## Development Tooling
-   **Linters & Formatters:**
    -   **ESLint & Prettier:** Configured for both `mobile-app` (React Native/Expo) and `api-server` (Next.js) to enforce code style, catch errors, and improve code quality.
    -   `mobile-app` uses `@react-native/eslint-config`, `simple-import-sort`, and Prettier.
    -   `api-server` uses Next.js's default ESLint setup (flat config `eslint.config.mjs`) extended with Prettier and `prettier-plugin-tailwindcss`. Lint scripts (`lint`, `lint:fix`) added to `package.json`.

## Recent Significant Changes
-   **2025-05-11 (OpenRouter Integration - Phase X):**
    -   Switched AI provider from Google Gemini to OpenRouter.
    -   Updated `api-server/src/app/api/chat/route.ts` to use OpenAI SDK with OpenRouter.
    -   Added `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` environment variables.
    -   Installed `openai` SDK in `api-server`.
-   **2025-05-10 (Core Chat Flow Implementation - Phase 2):**
    -   Implemented `GeminiApiService.ts` for backend communication.
    -   Updated `ChatScreen.tsx` for message state management, API calls, loading/error handling.
    -   Modified `MessageInput.tsx` and `MessageList.tsx` to integrate with `ChatScreen.tsx`.
    -   Refined `MessageBubble.tsx` with SVG feedback icons.
    -   Successfully tested core chat send/receive functionality with Gemini.
-   **2025-05-10 (Dependency Management & Integration - Phase 2):**
    -   Successfully integrated `react-native-safe-area-context`.
    -   Pivoted to `react-native-svg` for icons due to `lucide-react-native` issues.
    -   Decided to defer integration of `react-native-gesture-handler` and `react-native-reanimated`.
-   **2025-05-10 (SDK 53 Upgrade - Phase 2):**
    -   Successfully upgraded `mobile-app` to Expo SDK 53.
    -   Task 2.1 (Basic Chat Screen UI components) was previously completed.
-   **2025-05-10 (Phase 1 Completion - Gemini):**
    -   Completed Task 1.1 (Develop `/api/chat` endpoint).
    -   Completed Task 1.2 (Gemini Integration).
    -   Completed Task 1.3 (Error Handling for Gemini calls).
    -   Completed Task 1.4 (Vercel Deployment).
    -   Production API endpoint deployed and verified: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat` (was for Gemini).
-   **2025-05-09 & Earlier (Project Setup):**
    -   Project initialized, initial documentation (`cline_docs`, `memory-bank`, `README.md`) created.
    -   `mobile-app` (initially Expo SDK 51) project scaffolded.
    -   `api-server` (Next.js v15.3.2) project created.
    -   ESLint and Prettier configured for both projects.

## User Feedback Integration and Its Impact on Development (Planned)
-   The thumbs-up/down feedback on AI replies is a core MVP feature.
-   Initially, this feedback might be logged locally or sent to a simple endpoint for collection (if feasible within MVP constraints without complex backend storage).
-   This feedback will be crucial for understanding the quality of AI responses and identifying areas for prompt engineering or AI model tuning.
-   User-reported errors or issues (via retry mechanisms or general app feedback channels if established) will directly inform bug fixing and improvements.

## Additional Documentation References
-   `cline_docs/projectRoadmap.md`
-   `cline_docs/techStack.md`
-   `memory-bank/*` (all files for detailed context)
-   *(Future documents like `styleAesthetic.md` or `wireframes.md` will be listed here if created).*
