# System Patterns

## System Architecture Overview
The KhaRom application consists of two main parts in separate subdirectories (`mobile-app` and `api-server`) within the main project root:
1.  **React Native (Expo Bare SDK 51) Mobile Application:** The user-facing client application, located in `mobile-app/`. Responsible for UI, user input, and displaying AI responses. ESLint and Prettier are configured.
2.  **Next.js API Backend (v15.3.2):** A simple backend acting as a secure proxy to the Google Gemini API, located in `api-server/`. This will handle API key management and communication with the AI service. ESLint and Prettier are configured.

```mermaid
graph LR
    User[User] -- Interacts with --> MobileApp[React Native App (Expo Go)]
    MobileApp -- Sends Prompt --> NextApi[Next.js API Proxy (/src/app/api/chat)]
    NextApi -- Securely Calls --> Gemini[Google Gemini API]
    Gemini -- Returns Thai Response --> NextApi
    NextApi -- Relays Response --> MobileApp
    MobileApp -- Displays to --> User
```

## Key Technical Decisions & Justifications
-   **React Native (Expo Bare SDK 51):** Chosen for cross-platform mobile development. Now using Expo SDK 51 for better stability and fewer vulnerabilities. The "Bare" workflow (achieved via `expo prebuild`) allows for native module flexibility. Expo Go compatibility remains a key focus.
-   **Next.js for API Proxy:** Selected for its ease of creating API routes and serverless deployment capabilities (Vercel/Railway). It simplifies backend setup for a focused task like proxying.
-   **Tailwind CSS:** For styling in the Next.js part (if any UI is built there, primarily for API though) and potentially for React Native via compatible libraries if desired, though native styling or StyleSheet will be the default for React Native components.
-   **Google Gemini:** The core AI engine for generating Thai chat messages, as specified.
-   **i18next:** For UI localization (Thai/English) in the React Native app.
-   **No Firebase/Supabase:** A direct constraint from the project brief. Data persistence, if any for MVP, would need alternative solutions (e.g., AsyncStorage for local device storage).
-   **Environment-Protected API Keys:** Critical for security. API keys will be managed on Vercel/Railway, not in client code.

## Design Patterns (Initial Thoughts for React Native App)
-   **Component-Based Architecture:** Standard React pattern. For the `mobile-app`, reusable UI components will be organized in `mobile-app/src/components`.
-   **State Management:**
    -   For simple local state: React's `useState` and `useReducer`.
    -   For global state (e.g., UI language, potentially user session if added post-MVP): React Context API initially. If complexity grows, consider Zustand or Redux Toolkit.
-   **Service Layer:** API calls to the Next.js backend will be encapsulated in a services module (`/src/services`) to separate concerns.
-   **Navigation:** React Navigation will be used for screen transitions (`/src/navigation`).
-   **Hooks:** Custom hooks (`/src/hooks`) will be created for reusable logic (e.g., managing API call state, localization).

## Development Tooling
-   **Linters & Formatters:**
    -   **ESLint & Prettier:** Configured for both `mobile-app` (React Native/Expo) and `api-server` (Next.js) to enforce code style, catch errors, and improve code quality.
    -   `mobile-app` uses `@react-native/eslint-config`, `simple-import-sort`, and Prettier. Configuration files: `.eslintrc.js`, `.prettierrc.js`, `.eslintignore`, `.prettierignore`.
    -   `api-server` uses Next.js's default ESLint setup (flat config `eslint.config.mjs`) extended with Prettier and `prettier-plugin-tailwindcss`. Configuration files: `eslint.config.mjs`, `.prettierrc.js`.

## Component Relationships (Conceptual - To Be Refined)
-   `App.tsx` (or main entry point) -> `AppNavigator`
-   `AppNavigator` -> `ChatScreen`, `SettingsScreen` (potential)
-   `ChatScreen` -> `MessageList`, `MessageInput`, `MessageItem`
-   `MessageItem` -> Displays chat bubble, sender, timestamp, feedback buttons
-   `LanguageToggle` (global component) -> Updates i18next language

## Critical Implementation Paths
1.  **Expo Go Compatibility:** Every UI component and feature must be tested thoroughly in Expo Go on iOS.
2.  **Gemini API Integration:** Securely calling the Next.js proxy, which then calls Gemini, and handling responses/errors.
3.  **Chat Interface:** Building the core chat UI, including message input, display, loading states, and error states.
4.  **Localization Setup:** Integrating i18next and creating initial translation files for Thai and English.
5.  **Feedback Mechanism:** Implementing the thumbs-up/down functionality and potentially a way to report issues or retry messages.

## Project Structure (from .clinerules/clinerules.md)
```
/src
  /app              # Next.js API Routes (e.g., /api/chat) - This will be inside the Next.js project's src, e.g., api-server/src/app
  /components       # Reusable React Native components - This will be inside mobile-app/src/components
  /screens          # Mobile app screens - This will be inside mobile-app/src/screens
  /navigation       # React Navigation configuration - This will be inside mobile-app/src/navigation
  /hooks            # Custom React hooks - This will be inside mobile-app/src/hooks
  /services         # API services (Gemini proxy calls) - This will be inside mobile-app/src/services
  /constants        # App-wide constants - This will be inside mobile-app/src/constants
  /locales          # i18next translation files (Thai/EN) - This will be inside mobile-app/src/locales
/assets             # Static assets (images, fonts) - Each sub-project (mobile-app, api-server) might have its own assets folder, or a shared top-level one. For mobile-app, it's typically mobile-app/assets.
.clinerules         # Cline configuration folder (Root level)
/cline_docs         # Cline project context (Root level)
/memory-bank        # Cline Memory Bank folder (Root level)
/mobile-app         # React Native Expo project (ESLint/Prettier configured)
  .eslintrc.js
  .prettierrc.js
  ...
/api-server         # Next.js API project (v15.3.2, ESLint/Prettier configured)
  eslint.config.mjs
  .prettierrc.js
  ...
```
This structure clarifies that the specific `/src` subdirectories from `.clinerules` will reside within their respective application sub-projects (`mobile-app`, `api-server`).
