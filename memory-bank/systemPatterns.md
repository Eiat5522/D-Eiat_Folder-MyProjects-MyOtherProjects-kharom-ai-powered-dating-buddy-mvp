# System Patterns

## System Architecture Overview
The KhaRom application will consist of two main parts:
1.  **React Native (Expo Bare) Mobile Application:** The user-facing client application responsible for UI, user input, and displaying AI responses.
2.  **Next.js API Backend:** A simple backend acting as a secure proxy to the Google Gemini API. This backend will handle API key management and communication with the AI service.

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
-   **React Native (Expo Bare):** Chosen for cross-platform mobile development capabilities and alignment with project brief. The "Bare" workflow allows for more native module flexibility if needed, though initial focus is Expo Go compatibility.
-   **Next.js for API Proxy:** Selected for its ease of creating API routes and serverless deployment capabilities (Vercel/Railway). It simplifies backend setup for a focused task like proxying.
-   **Tailwind CSS:** For styling in the Next.js part (if any UI is built there, primarily for API though) and potentially for React Native via compatible libraries if desired, though native styling or StyleSheet will be the default for React Native components.
-   **Google Gemini:** The core AI engine for generating Thai chat messages, as specified.
-   **i18next:** For UI localization (Thai/English) in the React Native app.
-   **No Firebase/Supabase:** A direct constraint from the project brief. Data persistence, if any for MVP, would need alternative solutions (e.g., AsyncStorage for local device storage).
-   **Environment-Protected API Keys:** Critical for security. API keys will be managed on Vercel/Railway, not in client code.

## Design Patterns (Initial Thoughts for React Native App)
-   **Component-Based Architecture:** Standard React pattern. Reusable UI components will be organized in `/src/components`.
-   **State Management:**
    -   For simple local state: React's `useState` and `useReducer`.
    -   For global state (e.g., UI language, potentially user session if added post-MVP): React Context API initially. If complexity grows, consider Zustand or Redux Toolkit.
-   **Service Layer:** API calls to the Next.js backend will be encapsulated in a services module (`/src/services`) to separate concerns.
-   **Navigation:** React Navigation will be used for screen transitions (`/src/navigation`).
-   **Hooks:** Custom hooks (`/src/hooks`) will be created for reusable logic (e.g., managing API call state, localization).

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
This structure will be adhered to for organizing the codebase.
