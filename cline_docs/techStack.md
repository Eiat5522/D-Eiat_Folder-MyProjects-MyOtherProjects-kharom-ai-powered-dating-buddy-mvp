# Tech Stack: KhaRom MVP

This document outlines the key technology choices and architectural decisions for the KhaRom MVP project. It is derived from `.clinerules/clinerules.md` and `memory-bank/techContext.md`.

## Core Technologies

### Mobile Application (Frontend)
-   **Framework:** React Native (Expo Bare Workflow - SDK 51)
    -   **Current Version:** Expo SDK 51 (e.g., `expo: ~51.0.14`, `react-native: 0.73.6`)
    -   **Justification:** Upgraded to SDK 51 for better stability, fewer vulnerabilities, and modern features, while maintaining Expo Go iOS compatibility. The "Bare" workflow (via `expo prebuild`) provides native project access.
-   **Language:** TypeScript (`^5.1.3`)
    -   **Justification:** Enhances code quality, maintainability, and developer experience through static typing.
-   **Styling:** React Native `StyleSheet` API (Default)
    -   **Justification:** Standard for React Native. Tailwind CSS might be considered via compatible libraries if a strong preference emerges, but `StyleSheet` is the baseline.
-   **Localization:** i18next with `react-i18next`
    -   **Justification:** Robust and widely-used library for internationalization, supporting the Thai/English UI toggle requirement.

### Backend API (Proxy)
-   **Framework:** Next.js (v14+ with App Router)
    -   **Justification:** Specified for its ease of creating API routes (`/src/app/api/*`) and suitability for serverless deployment (Vercel/Railway). Simplifies backend setup for the focused task of proxying requests to Google Gemini.
-   **Language:** TypeScript
    -   **Justification:** Consistent with frontend; provides type safety for API request/response handling.
-   **Styling (if any backend UI):** Tailwind CSS
    -   **Justification:** As per `.clinerules`. Primarily for API routes, but if any admin/status pages are built, Tailwind will be used.

### AI Service
-   **Provider:** Google Gemini
    -   **Justification:** Specified as the AI engine for generating Thai language chat responses.

## Deployment Platforms
-   **Mobile App (React Native):**
    -   **Testing:** Expo Go (iOS primary)
    -   **Builds:** EAS Build (Expo Application Services)
    -   **Justification:** Standard Expo ecosystem tools for development, testing, and deployment.
-   **Backend API (Next.js):** Vercel or Railway
    -   **Justification:** Specified for their seamless integration with Next.js, serverless capabilities, and ease of environment variable management for API keys. Automatic deployments on merge to `main` branch will be configured.

## Version Control
-   **System:** Git
-   **Hosting:** GitHub
    -   **Justification:** Industry standard for collaborative software development. Workflow will involve feature branches and pull requests.

## Key Architectural Decisions
-   **Decoupled Frontend and Backend:** The React Native app and Next.js API are separate entities, communicating via HTTP requests. This promotes separation of concerns.
-   **Secure API Proxy:** The Next.js backend acts as a crucial security layer, protecting the Google Gemini API key. The client application will never directly access or store this key.
-   **Stateless API:** The Next.js API proxy will be designed to be stateless for the MVP, simplifying scalability and deployment.
-   **Expo Go First:** Development and testing will prioritize full functionality within the Expo Go iOS environment. Any library or feature considered must be vetted for Expo Go compatibility.
-   **Progressive Complexity for State Management (Frontend):** Start with React's built-in state management (`useState`, `useReducer`, Context API). More complex solutions (Zustand, Redux Toolkit) will only be considered if application complexity demonstrably requires them post-MVP.

This document will be updated if significant technology decisions change.
