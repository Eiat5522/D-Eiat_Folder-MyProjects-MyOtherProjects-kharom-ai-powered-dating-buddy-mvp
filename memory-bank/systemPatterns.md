# System Patterns

## System Architecture Overview
The KhaRom application consists of two main parts in separate subdirectories (`mobile-app` and `api-server`) within the main project root:
1.  **React Native (Expo Bare SDK 53) Mobile Application:** The user-facing client application, located in `mobile-app/`. Responsible for UI, user input, and displaying AI responses. ESLint and Prettier are configured.
2.  **Next.js API Backend (v15.3.2):** A simple backend acting as a secure proxy to the Google Gemini API, located in `api-server/`. This will handle API key management, communication with the AI service, and error handling. ESLint and Prettier are configured.

```mermaid
graph LR
    User[User] -- Interacts with --> MobileApp[React Native App (Expo Go - SDK 53)]
    MobileApp -- Sends Prompt --> NextApi[Next.js API Proxy (/src/app/api/chat)]
    NextApi -- Securely Calls --> Gemini[Google Gemini API]
    Gemini -- Returns Thai Response --> NextApi
    NextApi -- Relays Response/Errors --> MobileApp
    MobileApp -- Displays to --> User
```

## Key Technical Decisions & Justifications
-   **React Native (Expo Bare SDK 53):** Chosen for cross-platform mobile development. Upgraded to Expo SDK 53 for latest features, stability, and Expo Go compatibility. The "Bare" workflow (achieved via `expo prebuild`) allows for native module flexibility.
-   **Next.js for API Proxy:** Selected for its ease of creating API routes and serverless deployment capabilities (Vercel). It simplifies backend setup for a focused task like proxying.
-   **Tailwind CSS:** For styling in the Next.js part (if any UI is built there, primarily for API though). Native `StyleSheet` is the default for React Native components.
-   **Google Gemini:** The core AI engine for generating Thai chat messages. The `api-server` uses the `@google/generative-ai` SDK.
-   **System Instructions for AI Persona:** The Gemini API will be called with a `systemInstruction` parameter from the backend to define KhaRom's persona and language constraints.
-   **i18next:** (Planned) For UI localization (Thai/English) in the React Native app.
-   **No Firebase/Supabase:** A direct constraint from the project brief.
-   **Environment-Protected API Keys:** Critical for security. API keys are managed on Vercel, not in client code.

## Backend Error Handling Pattern (Implemented in `api-server/src/app/api/chat/route.ts`)
- **Type Guard Pattern:** Uses `isGeminiError` to check error structure.
- **HTTP Status Code Mapping:**
  - 401: Authentication/Permission errors.
  - 429: Rate limit exceeded.
  - 400: Invalid input or content safety blocks.
  - 503: Service unavailable.
  - 500: Internal errors or unknown issues.
- **Error Response Structure:**
  ```typescript
  interface ChatResponseBody {
    reply: string | null;
    error: string | null;
    blocked?: boolean;
    blockReason?: string;
  }
  ```
- **Error Logging:** Comprehensive server-side logging.
- **Content Safety:** Checks `promptFeedback.blockReason`.

## Design Patterns (React Native App - `mobile-app/`)
-   **Component-Based Architecture:** Reusable UI components in `mobile-app/src/components`.
    -   `ChatScreen.tsx`: Manages overall chat state and logic.
    -   `MessageList.tsx`: Renders the list of messages.
    -   `MessageBubble.tsx`: Displays individual messages with feedback options.
    -   `MessageInput.tsx`: Handles user text input and send action.
-   **State Management:**
    -   Primarily `useState` within `ChatScreen.tsx` for managing messages, loading, and error states.
-   **Service Layer:** API calls encapsulated in `mobile-app/src/services/GeminiApiService.ts`.
-   **Navigation:** (Planned) React Navigation for any future screen transitions.
-   **Hooks:** (Planned) Custom hooks for reusable logic if needed.

## Development Tooling
-   **Linters & Formatters:** ESLint & Prettier configured for both `mobile-app` and `api-server`.

## Component Relationships (Current)
-   `App.tsx` -> `SafeAreaProvider` -> `ChatScreen.tsx`
-   `ChatScreen.tsx` -> `MessageList.tsx`, `MessageInput.tsx`
-   `MessageList.tsx` -> `MessageBubble.tsx` (for each message)
-   `MessageInput.tsx` -> Calls `onSend` prop handled by `ChatScreen.tsx`
-   `MessageBubble.tsx` -> Calls `onFeedback` prop handled by `ChatScreen.tsx` (for future feedback logic)
-   `ChatScreen.tsx` -> `GeminiApiService.ts` -> `api-server/src/app/api/chat/route.ts`

## Critical Implementation Paths
1.  **Expo Go Compatibility (SDK 53):** Ongoing testing for all UI components and features.
2.  **Gemini API Integration & System Persona:** Ensuring the `systemInstruction` effectively guides the AI from the backend.
3.  **Localization Setup:** Integrating i18next.
4.  **Full UX Feedback Mechanism:** Implementing complete logic for thumbs-up/down and retry.

## Project Structure (from .clinerules/clinerules.md - adapted for current state)
```
/mobile-app/            # React Native Expo SDK 53 project
  /src/
    /components/
    /services/
  ...
/api-server/            # Next.js API project (v15.3.2)
  /src/
    /app/api/chat/route.ts
  ...
... (Root level folders: .clinerules, cline_docs, memory-bank)
