# System Patterns

## System Architecture Overview
The KhaRom application consists of two main parts in separate subdirectories (`mobile-app` and `api-server`) within the main project root:
1.  **React Native (Expo Bare SDK 53) Mobile Application:** The user-facing client application, located in `mobile-app/`. Responsible for UI, user input, and displaying AI responses. ESLint and Prettier are configured.
2.  **Next.js API Backend (v15.3.2):** A simple backend acting as a secure proxy to the OpenRouter API, located in `api-server/`. This will handle API key management, communication with the AI service, and error handling. ESLint and Prettier are configured.

```mermaid
graph LR
    User[User] -- Interacts with --> MobileApp[React Native App (Expo Go)]
    MobileApp -- Sends Prompt --> NextApi[Next.js API Proxy (/src/app/api/chat)]
    NextApi -- Securely Calls --> OpenRouter[OpenRouter API]
    OpenRouter -- Returns Thai Response --> NextApi
    NextApi -- Relays Response/Errors --> MobileApp
    MobileApp -- Displays to --> User
```

## Key Technical Decisions & Justifications
-   **React Native (Expo Bare SDK 53):** Chosen for cross-platform mobile development. Now using Expo SDK 53 for better stability and fewer vulnerabilities. The "Bare" workflow (achieved via `expo prebuild`) allows for native module flexibility. Expo Go compatibility remains a key focus.
-   **Next.js for API Proxy:** Selected for its ease of creating API routes and serverless deployment capabilities (Vercel/Railway). It simplifies backend setup for a focused task like proxying.
-   **Tailwind CSS:** For styling in the Next.js part (if any UI is built there, primarily for API though) and potentially for React Native via compatible libraries if desired, though native styling or StyleSheet will be the default for React Native components.
-   **OpenRouter API:** The core AI engine for generating Thai chat messages, providing access to various models. Uses OpenAI SDK.
-   **i18next:** For UI localization (Thai/English) in the React Native app.
-   **No Firebase/Supabase:** A direct constraint from the project brief. Data persistence, if any for MVP, would need alternative solutions (e.g., AsyncStorage for local device storage).
-   **Environment-Protected API Keys:** Critical for security. The OpenRouter API key (`OPENROUTER_API_KEY`) will be managed on Vercel/Railway (and locally in `.env.local`), not in client code.

## Backend Error Handling Pattern
- **Type Guard Pattern (for OpenAI SDK):** Use `error instanceof OpenAI.APIError` to check error structure.
  ```typescript
  // Example in route.ts
  // if (error instanceof OpenAI.APIError) {
  //   const status = error.status || 500;
  //   // ... handle specific OpenAI/OpenRouter errors
  // }
  ```
- **HTTP Status Code Mapping (General):**
  - 401: Authentication errors (e.g., invalid OpenRouter API key).
  - 429: Rate limit exceeded or quota issues.
  - 400: Invalid input (e.g., malformed request, invalid model specified by client if that feature is added).
  - 503: Service unavailable (if OpenRouter or underlying model is down).
  - 500: Internal server errors or unknown issues.
- **Error Response Structure (Remains the same for the client):**
  ```typescript
  interface ChatResponseBody {
    reply: string | null;
    error: string | null;
    blocked?: boolean; // May need adjustment based on OpenRouter/model content filtering signals
    blockReason?: string;
  }
  ```
- **Error Logging:** Comprehensive server-side logging with error type, message, and context.
- **Content Safety:** Monitor `completion.choices[0]?.finish_reason === 'content_filter'` or specific error codes from OpenRouter/OpenAI SDK for content moderation.
- **User-Friendly Messages:** Generic client-facing messages that don't expose internal details.

## Design Patterns (Initial Thoughts for React Native App)
-   **Component-Based Architecture:** Standard React pattern. For the `mobile-app`, reusable UI components will be organized in `mobile-app/src/components`.
-   **State Management:**
    -   For simple local state: React's `useState` and `useReducer`.
    -   For global state: React Context API is used for UI language (`LanguageContext.tsx`) and chat session management (`SessionContext.tsx`).
-   **Local Data Persistence:** `AsyncStorage` is utilized via `SessionStorageService.ts` to store chat sessions and their summaries locally on the device. This service handles CRUD operations for session data.
-   **Service Layer:**
    -   `ChatApiService.ts`: Handles API calls to the Next.js backend for AI responses. Defines core data interfaces like `ChatMessage`, `ChatSession`, `SessionSummary`.
    -   `SessionStorageService.ts`: Manages persistence of chat sessions.
-   **Navigation:** React Navigation (`@react-navigation/drawer`) is used for drawer-based navigation in `AppNavigator.tsx`.
-   **Swipe-to-Reveal Actions:** `ReanimatedSwipeable` from `react-native-gesture-handler` is used in `ChatHistoryScreen.tsx` to provide swipeable list items for actions like rename and delete, incorporating micro-interactions.
-   **Hooks:** Custom hooks (`/src/hooks`) will be created for reusable logic (e.g., managing API call state, localization).

## Development Tooling
-   **Linters & Formatters:**
    -   **ESLint & Prettier:** Configured for both `mobile-app` (React Native/Expo) and `api-server` (Next.js) to enforce code style, catch errors, and improve code quality.
    -   `mobile-app` uses `@react-native/eslint-config`, `simple-import-sort`, and Prettier. Configuration files: `.eslintrc.js`, `.prettierrc.js`, `.eslintignore`, `.prettierignore`.
    -   `api-server` uses Next.js's default ESLint setup (flat config `eslint.config.mjs`) extended with Prettier and `prettier-plugin-tailwindcss`. Configuration files: `eslint.config.mjs`, `.prettierrc.js`.

## Component Relationships (Conceptual - To Be Refined)
-   `App.tsx` -> Initializes `LanguageProvider`, `SessionProvider`, then `AppNavigator`.
-   `AppNavigator` (Drawer Navigator):
    -   Manages screens: `ChatScreen`, `ChatHistoryScreen`.
    -   `CustomDrawerContent`: Includes language toggle (uses `LanguageContext`) and "New Chat" action (uses `SessionContext`). Navigates to `ChatHistoryScreen`.
-   `ChatScreen`:
    -   Uses `SessionContext` to display messages of the active session and to save new messages.
    -   Uses `ChatApiService` for AI communication.
    -   Composed of `MessageList`, `MessageInput`.
-   `ChatHistoryScreen`:
    -   Uses `SessionContext` to display list of session summaries and perform actions (select, rename, delete session).
    -   Uses `ReanimatedSwipeable` for list item actions.
-   `MessageList` -> `MessageBubble` (displays individual messages, handles feedback UI which calls context functions via `ChatScreen`).
-   `SessionContext` -> Uses `SessionStorageService` for data persistence.
-   `SessionStorageService` -> Interacts with `AsyncStorage`.

## Critical Implementation Paths
1.  **Expo Go Compatibility:** Ongoing for all features.
2.  **OpenRouter API Integration:** Complete and functional.
3.  **Chat Interface & Core Logic:** Complete, localized, includes feedback and retry. Now session-aware.
4.  **Localization Setup:** Complete with i18next, context, and persistence. All UI text localized.
5.  **UX Feedback Mechanisms:** Complete and integrated with session persistence.
6.  **Session-Based Chat History:** Complete, including data storage via `AsyncStorage`, context management (`SessionContext`), UI (`ChatHistoryScreen` with swipe actions, FAB), drawer navigation integration, and `ChatScreen` refactoring.

## Project Structure (from .clinerules/clinerules.md, with updates)
```
/mobile-app/
  /src/
    /app              # (If any Expo-specific app config, else mostly for Next.js)
    /components/      # Reusable React Native components (ChatScreen, MessageBubble, etc.)
    /screens/         # Screen components (ChatHistoryScreen.tsx)
    /navigation/      # React Navigation configuration (AppNavigator.tsx)
    /hooks/           # Custom React hooks
    /services/        # API services (ChatApiService.ts, SessionStorageService.ts)
    /context/         # React Context providers (LanguageContext.tsx, SessionContext.tsx)
    /constants/       # App-wide constants
    /locales/         # i18next translation files (en.json, th.json)
  /assets/            # Static assets (images, fonts)
  App.tsx
  ...
/api-server/
  /src/app/api/       # Next.js API Routes
  ...
.clinerules        # Cline configuration folder (Root level)
/cline_docs        # Cline project context (Root level)
/memory-bank       # Cline Memory Bank folder (Root level)
/mobile-app        # React Native Expo project (ESLint/Prettier configured)
  .eslintrc.js
  .prettierrc.js
  ...
/api-server        # Next.js API project (v15.3.2, ESLint/Prettier configured)
  eslint.config.mjs
  .prettierrc.js
  ...
```
This structure clarifies that the specific `/src` subdirectories from `.clinerules` will reside within their respective application sub-projects (`mobile-app`, `api-server`).
