# Tech Stack: KhaRom MVP

This document outlines the key technology choices and architectural decisions for the KhaRom MVP project. It is derived from `.clinerules/clinerules.md` and `memory-bank/techContext.md`.

## Core Technologies

### Mobile Application (Frontend)
-   **Framework:** React Native (Expo Bare Workflow - SDK 53)
    -   **Current Version:** Expo SDK 53.0.0 (e.g., `expo: ^53.0.0`, `react-native: 0.79.2`, `react: 19.0.0`)
    -   **Justification:** Upgraded to SDK 53 for latest features, better stability, and ongoing Expo Go iOS compatibility. The "Bare" workflow (via `expo prebuild`) provides native project access.
-   **Language:** TypeScript (`^5.8.3` or compatible with SDK 53)
    -   **Justification:** Enhances code quality, maintainability, and developer experience through static typing.
-   **Styling:** React Native `StyleSheet` API (Default)
    -   **Justification:** Standard for React Native. Tailwind CSS might be considered via compatible libraries if a strong preference emerges, but `StyleSheet` is the baseline.
-   **Localization:** i18next with `react-i18next`
    -   **Justification:** Robust and widely-used library for internationalization, supporting the Thai/English UI toggle requirement.

### Backend API (Proxy)
-   **Framework:** Next.js (App Router)
    -   **Current Version:** Next.js 15.3.2 (from `create-next-app`)
    -   **Justification:** Specified for its ease of creating API routes (`/src/app/api/*`) and suitability for serverless deployment (Vercel/Railway). Simplifies backend setup for the focused task of proxying requests to Google Gemini.
-   **Language:** TypeScript
    -   **Justification:** Consistent with frontend; provides type safety for API request/response handling.
-   **Styling (if any backend UI):** Tailwind CSS
    -   **Justification:** As per `.clinerules`. Primarily for API routes, but if any admin/status pages are built, Tailwind will be used. Configured with `prettier-plugin-tailwindcss`.

### AI Service
-   **Provider:** OpenRouter (via OpenAI-compatible API)
    -   **Justification:** Switched from Google Gemini to allow testing of various AI models. Provides a unified API for multiple underlying models.
    -   **SDK/Client:** `openai` TypeScript SDK.
    -   **API Key:** `OPENROUTER_API_KEY` (environment variable).
    -   **Default Model:** Configured via `OPENROUTER_DEFAULT_MODEL` (environment variable).

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

## Linters & Formatters
-   **Purpose:** Maintain code quality, consistency, and adherence to best practices across both `mobile-app` and `api-server`.
-   **`mobile-app` (React Native / Expo):**
    -   **ESLint:** Configured with `@react-native/eslint-config`, `@typescript-eslint/parser`, `eslint-plugin-simple-import-sort`, and integrated with Prettier. Key plugins: `@typescript-eslint`, `simple-import-sort`, `prettier`, `react`, `react-hooks`, `jsx-a11y`.
    -   **Prettier:** Standard configuration for code formatting.
    -   **Files:** `.eslintrc.js`, `.prettierrc.js`, `.eslintignore`, `.prettierignore`.
-   **`api-server` (Next.js):**
    -   **ESLint:** Default Next.js setup (using flat config `eslint.config.mjs`), extended with `plugin:prettier/recommended`.
    -   **Prettier:** Standard configuration, includes `prettier-plugin-tailwindcss`.
    -   **Files:** `eslint.config.mjs`, `.prettierrc.js`. (Next.js handles ignores well by default, specific ignore files can be added if needed).

## Key Architectural Decisions
-   **Decoupled Frontend and Backend:** The React Native app and Next.js API are separate entities, communicating via HTTP requests. This promotes separation of concerns.
-   **Secure API Proxy:** The Next.js backend acts as a crucial security layer, protecting the OpenRouter API key. The client application will never directly access or store this key.
-   **Stateless API:** The Next.js API proxy will be designed to be stateless for the MVP, simplifying scalability and deployment.
-   **Expo Go First:** Development and testing will prioritize full functionality within the Expo Go iOS environment. Any library or feature considered must be vetted for Expo Go compatibility.
-   **Progressive Complexity for State Management (Frontend):** Start with React's built-in state management (`useState`, `useReducer`, Context API). More complex solutions (Zustand, Redux Toolkit) will only be considered if application complexity demonstrably requires them post-MVP.

This document will be updated if significant technology decisions change.
