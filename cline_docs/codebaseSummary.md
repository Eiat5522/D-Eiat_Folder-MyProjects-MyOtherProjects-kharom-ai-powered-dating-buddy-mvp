# Codebase Summary: KhaRom MVP (Post Mobile App Setup)

This document provides a high-level overview of the KhaRom MVP project structure and will be updated as development progresses.

## Project Structure Overview
The project is structured as a monorepo with distinct applications/packages.
- **`mobile-app/`**: Contains the React Native (Expo SDK 51, Bare workflow) mobile application. This is the primary frontend. ESLint and Prettier are configured.
- **`api-server/`**: Contains the Next.js (v15.3.2) application for the backend API proxy. ESLint and Prettier are configured.
- **Root Level**: Contains documentation (`cline_docs/`, `memory-bank/`), configuration (`.clinerules/`), and the main `README.md`.

**Interpreted Project Structure (based on `.clinerules/clinerules.md` and current setup):**
```
/mobile-app/            # React Native Expo SDK 51 project
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

## Key Components and Their Interactions (Planned)

### React Native Mobile App (`mobile-app/` - Expo SDK 51)
-   **`App.tsx` (or main entry):** Root component, initializes navigation and global providers (e.g., i18next).
-   **Navigation (`/src/navigation`):**
    -   `AppNavigator`: Manages screen transitions (e.g., between ChatScreen and potential future screens like Settings).
    -   Uses `react-navigation`.
-   **Screens (`/src/screens`):**
    -   (Currently, `ChatScreen.tsx` is in `/src/components/`. It might be moved to `/src/screens/` later if more screens are added.)
-   **Components (`/src/components`):**
    -   `ChatScreen.tsx`: (Created 2025-05-10) Main screen container for the chat interface. Renders `MessageList` and `MessageInput`.
    -   `MessageList.tsx`: (Created 2025-05-10) Displays a list of messages using `FlatList`. Renders `MessageBubble` for each message. Currently uses mock data.
    -   `MessageBubble.tsx`: (Created 2025-05-10) Styles and displays individual chat messages for both user and AI, including text and timestamp. Serves a similar purpose to the planned `MessageItem.tsx`.
    -   `MessageInput.tsx`: (Created 2025-05-10) Provides a multiline text input field and a send button. Includes basic logic for input handling and a placeholder for send functionality.
    -   (Planned) `LanguageToggle.tsx`: UI element to switch app language (Thai/English).
    -   (Planned) `LoadingIndicator.tsx`: Visual feedback during AI processing.
-   **Services (`/src/services`):**
    -   `GeminiApiService.ts`: Encapsulates logic for making API calls to the Next.js backend proxy. Handles request formatting and response parsing.
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
    -   **Status:** Basic placeholder implemented (Task 1.1 completed 2025-05-10).
    -   Handles POST requests from the React Native app (currently with placeholder logic).
    -   (Planned) Securely calls the Google Gemini API with the user's prompt.
    -   Manages the Gemini API key (via environment variables).
    -   Returns the AI-generated Thai response or an error.

## Data Flow (Planned)
1.  **User Input:** User types a message in `MessageInput` on `ChatScreen`.
2.  **API Request:** `ChatScreen` (via `GeminiApiService`) sends a POST request with the prompt to the Next.js `/api/chat` endpoint.
3.  **Backend Processing:** The Next.js API route validates the request, calls the Google Gemini API, and awaits the response.
4.  **API Response:** Gemini returns a Thai message; Next.js relays this back to the React Native app.
5.  **UI Update:** `ChatScreen` receives the response (or error) and updates the `MessageList` via state changes.

## External Dependencies
-   **Google Gemini API:** Core external service for AI text generation.
-   **React Navigation:** For screen navigation in the mobile app.
-   **i18next & react-i18next:** For localization.
-   **Expo SDK 51 & related libraries:**
    -   `expo: "~51.0.14"`
    -   `react: "18.2.0"`
    -   `react-native: "0.73.6"`
    -   `expo-status-bar: "~1.12.1"`
-   **Next.js & related libraries (in `api-server/`):**
    -   `next: "15.3.2"`
    -   `react: "^19.0.0"`
    -   `typescript: "^5"`
    -   `tailwindcss: "^4"`
-   **ESLint & Prettier (Dev Dependencies):** Configured in both `mobile-app` and `api-server` with relevant plugins for React Native, Next.js, TypeScript, and Tailwind CSS.
-   **@google/generative-ai (or similar):** Node.js SDK for interacting with Gemini API from the backend (to be added to `api-server`).

*(Other dependencies will be added as features are implemented.)*

## Development Tooling
-   **Linters & Formatters:**
    -   **ESLint & Prettier:** Configured for both `mobile-app` (React Native/Expo) and `api-server` (Next.js) to enforce code style, catch errors, and improve code quality.
    -   `mobile-app` uses `@react-native/eslint-config`, `simple-import-sort`, and Prettier.
    -   `api-server` uses Next.js's default ESLint setup (flat config `eslint.config.mjs`) extended with Prettier and `prettier-plugin-tailwindcss`. Lint scripts (`lint`, `lint:fix`) added to `package.json`.

## Recent Significant Changes
-   **2025-05-10 (Task 1.1):**
    -   Created `api-server/src/app/api/chat/route.ts` with a basic POST handler and placeholder response.
    -   Defined `ChatRequestBody` and `ChatResponseBody` TypeScript interfaces.
    -   Updated `api-server/package.json` to include `lint` and `lint:fix` scripts.
-   **2025-05-10 (Task 2.1 - Chat UI Implementation):**
    -   Created `ChatScreen.tsx`, `MessageList.tsx`, `MessageBubble.tsx`, and `MessageInput.tsx` in `mobile-app/src/components/`.
    -   Integrated these components for a basic chat UI structure.
    -   Updated `mobile-app/App.tsx` to render `ChatScreen`.
    -   Started Expo development server for `mobile-app`.
-   **2025-05-10 (Phase 1 Completion):**
    -   Completed Task 1.2 (Gemini Integration), Task 1.3 (Error Handling), and Task 1.4 (Vercel Deployment) for `api-server`.
    -   Production API endpoint deployed and verified: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`.
-   **2025-05-09 & Earlier (Project Setup):**
    -   Project initialized, initial documentation (`cline_docs`, `memory-bank`, `README.md`) created.
    -   `mobile-app` (React Native Expo SDK 51) project scaffolded and stabilized.
    -   `api-server` (Next.js v15.3.2) project created.
    -   ESLint and Prettier configured for both projects.

## User Feedback Integration and Its Impact on Development (Planned)
-   The thumbs-up/down feedback on AI replies is a core MVP feature.
-   Initially, this feedback might be logged locally or sent to a simple endpoint for collection (if feasible within MVP constraints without complex backend storage).
-   This feedback will be crucial for understanding the quality of AI responses and identifying areas for prompt engineering or AI model tuning (if applicable/possible with Gemini).
-   User-reported errors or issues (via retry mechanisms or general app feedback channels if established) will directly inform bug fixing and improvements.

## Additional Documentation References
-   `cline_docs/projectRoadmap.md`
-   `cline_docs/techStack.md`
-   `memory-bank/*` (all files for detailed context)
-   *(Future documents like `styleAesthetic.md` or `wireframes.md` will be listed here if created).*
