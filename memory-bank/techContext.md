# Tech Context

## Core Technologies
-   **React Native (Expo Bare Workflow - SDK 51):**
    -   **Language:** TypeScript
    -   **Purpose:** Mobile application development for iOS (primary focus on Expo Go compatibility) and Android.
    -   **Current Status:** Successfully set up with Expo SDK 51. 3 low severity vulnerabilities remain (deferred).
-   **Next.js (v14+ with App Router):**
    -   **Language:** TypeScript
    -   **Purpose:** Backend API proxy to Google Gemini. Will host API routes under `/src/app/api/`.
-   **Google Gemini API:**
    -   **Purpose:** AI engine for generating Thai language chat responses.
-   **Tailwind CSS:**
    -   **Purpose:** Styling, primarily for any UI within the Next.js backend (if applicable, e.g., a status page) and potentially for React Native if a compatible library is chosen. Default for React Native will be `StyleSheet`.
-   **i18next:**
    -   **Purpose:** Internationalization and localization for the React Native app, supporting Thai and English UI.

## Development Setup & Environment
-   **Version Control:** Git, hosted on GitHub.
    -   **Workflow:** Feature branches, pull requests for all changes, merging to `main` branch.
-   **Package Managers:**
    -   `npm` or `yarn` for both React Native (Expo) and Next.js projects. Consistency will be maintained.
-   **Expo CLI:** For managing the Expo project, running the development server, and building with EAS Build.
-   **Node.js:** Required for running Expo, Next.js, and associated tooling. LTS version recommended.
-   **IDE:** Visual Studio Code is assumed, with relevant extensions for React Native, TypeScript, Tailwind CSS, etc.
-   **Testing Environment:**
    -   **Primary:** Expo Go app on a physical iOS device for UI and core functionality testing.
    -   Simulators/Emulators for iOS and Android as secondary testing environments.
    -   Unit/Integration tests (e.g., Jest, React Testing Library) to be considered post-MVP or for critical logic.

## Technical Constraints
-   **Expo Go iOS App Compatibility:** This is a paramount constraint. All features and libraries must be compatible and performant within Expo Go.
-   **No Firebase/Supabase:** Explicitly disallowed by project brief.
-   **API Key Security:** Google Gemini API key must be stored as an environment variable on the deployment platform (Vercel/Railway) and accessed only by the Next.js backend. It must not be exposed in the client-side React Native code.
-   **Thai-Only AI Responses:** The Gemini API will be prompted to generate responses exclusively in Thai.
-   **Stateless API Proxy:** The Next.js API proxy should ideally be stateless, handling requests and responses without maintaining session data between calls for the MVP.

## Key Dependencies (Initial List - To Be Expanded)

### React Native (Expo) App (SDK 51):
-   `expo: "~51.0.14"`
-   `react: "18.2.0"`
-   `react-native: "0.73.6"`
-   `expo-status-bar: "~1.12.1"`
-   `typescript: "^5.1.3"` (from package.json)
-   `i18next` (to be added)
-   `react-i18next` (to be added)
-   `react-navigation` (and its various packages, to be added)
-   Other `expo-*` packages will be aligned with SDK 51 as they are added.

### Next.js API Backend:
-   `next`
-   `react` (peer dependency for Next.js)
-   `react-dom` (peer dependency for Next.js)
-   `typescript`
-   `@google/generative-ai` (or the official Google AI SDK for Node.js)
-   `tailwindcss` (if used for any backend UI or utility classes)

## Tool Usage Patterns
-   **Cline:** For assistance with code scaffolding, reviews, documentation updates, and task management. Will interact with `cline_docs/` and `memory-bank/`.
-   **GitHub:** For all version control operations, pull requests, and code reviews.
-   **Expo CLI:** `expo start` for running the dev server, `expo prebuild` (if ejecting to Bare workflow or needing specific native configurations), and interfacing with EAS services.
-   **EAS Build (Expo Application Services):** For building the React Native application for distribution and deployment (post-MVP or for TestFlight).
-   **Vercel / Railway CLI:** For deploying the Next.js backend API. Deployment will be configured for automatic triggers on merge to the `main` branch.
-   **Linters/Formatters (e.g., ESLint, Prettier):** To be configured for maintaining code quality and consistency.

## Deployment
-   **React Native App:** Via EAS Build. Initial testing via Expo Go.
-   **Next.js Backend API:** Vercel or Railway.
