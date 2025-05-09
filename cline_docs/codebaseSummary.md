# Codebase Summary: KhaRom MVP (Initial State)

This document provides a high-level overview of the KhaRom MVP project structure and will be updated as development progresses.

## Project Structure Overview
The project is divided into two main parts: a React Native (Expo Bare) mobile application for the frontend and a Next.js application for the backend API proxy.

**Defined Project Structure (from `.clinerules/clinerules.md`):**
```
/src
  /app              # Next.js API Routes (e.g., /api/chat)
  /components       # Reusable React Native components
  /screens          # Mobile app screens
  /navigation       # React Navigation configuration
  /hooks            # Custom React hooks
  /services         # API services (Gemini proxy calls)
  /constants        # App-wide constants
  /locales          # i18next translation files (Thai/EN)
/assets             # Static assets (images, fonts)
.clinerules         # Cline configuration folder
/cline_docs         # Cline project context
/memory-bank        # Cline Memory Bank folder
```
*(Note: This structure is planned. The actual directories will be created during project scaffolding.)*

## Key Components and Their Interactions (Planned)

### React Native Mobile App (`/src` within Expo project)
-   **`App.tsx` (or main entry):** Root component, initializes navigation and global providers (e.g., i18next).
-   **Navigation (`/src/navigation`):**
    -   `AppNavigator`: Manages screen transitions (e.g., between ChatScreen and potential future screens like Settings).
    -   Uses `react-navigation`.
-   **Screens (`/src/screens`):**
    -   `ChatScreen.tsx`: The primary screen for user interaction. Hosts message input, message list, and AI responses.
-   **Components (`/src/components`):**
    -   `MessageInput.tsx`: Handles user text input and send action.
    -   `MessageList.tsx`: Renders the list of chat messages.
    -   `MessageItem.tsx`: Displays individual chat bubbles (user and AI), timestamps, and feedback options (thumbs-up/down, retry).
    -   `LanguageToggle.tsx`: UI element to switch app language (Thai/English).
    -   `LoadingIndicator.tsx`: Visual feedback during AI processing.
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
-   **`chat/route.ts` (or similar for App Router):**
    -   Handles POST requests from the React Native app.
    -   Securely calls the Google Gemini API with the user's prompt.
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
-   **Expo SDK & related libraries:** For mobile app development.
-   **Next.js & related libraries:** For backend API development.
-   **@google/generative-ai (or similar):** Node.js SDK for interacting with Gemini API from the backend.

*(Specific versions and a more detailed list will be maintained in `package.json` files for each project and potentially summarized here as they are finalized.)*

## Recent Significant Changes
-   **2025-05-09:** Project initialized. This `codebaseSummary.md` created as a baseline. No code exists yet.

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
