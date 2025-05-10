# Tech Context

## Core Technologies
-   **React Native (Expo Bare Workflow - SDK 51):**
    -   **Language:** TypeScript
    -   **Purpose:** Mobile application development for iOS (primary focus on Expo Go compatibility) and Android.
    -   **Current Status:** Successfully set up with Expo SDK 51. 3 low severity vulnerabilities remain (deferred). ESLint and Prettier configured.
-   **Next.js (App Router):**
    -   **Version:** 15.3.2
    -   **Language:** TypeScript
    -   **Purpose:** Backend API proxy to Google Gemini. Hosts API routes under `api-server/src/app/api/`.
    -   **Current Status:** Project created in `api-server/`. ESLint and Prettier configured.
-   **Google Gemini API:**
    -   **Purpose:** AI engine for generating Thai language chat responses.
-   **Tailwind CSS:**
    -   **Purpose:** Styling for the Next.js backend (API project). Configured with `prettier-plugin-tailwindcss`. For React Native, default is `StyleSheet`.
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
-   `typescript: "~5.3.3"` (from package.json)
-   **Dev Dependencies (ESLint/Prettier):**
    -   `eslint: "^8.57.1"`
    -   `prettier: "^3.5.3"`
    -   `@typescript-eslint/parser: "^8.32.0"`
    -   `@typescript-eslint/eslint-plugin: "^8.32.0"`
    -   `eslint-config-prettier: "^10.1.5"`
    -   `eslint-plugin-prettier: "^5.4.0"`
    -   `eslint-plugin-react: "^7.37.5"`
    -   `eslint-plugin-react-hooks: "^5.2.0"`
    -   `eslint-plugin-jsx-a11y: "^6.10.2"`
    -   `@react-native/eslint-config: "^0.79.2"`
    -   `eslint-plugin-simple-import-sort: "^12.1.1"`
-   `i18next` (to be added)
-   `react-i18next` (to be added)
-   `react-navigation` (and its various packages, to be added)
-   Other `expo-*` packages will be aligned with SDK 51 as they are added.

### Next.js API Backend (`api-server/`):
-   `next: "15.3.2"`
-   `react: "^19.0.0"`
-   `react-dom: "^19.0.0"`
-   `typescript: "^5"`
-   `tailwindcss: "^4"`
-   **Dev Dependencies (ESLint/Prettier):**
    -   `eslint: "^9"` (from Next.js setup)
    -   `eslint-config-next: "15.3.2"`
    -   `prettier: "^3.5.3"`
    -   `eslint-config-prettier: "^10.1.5"`
    -   `eslint-plugin-prettier: "^5.4.0"`
    -   `prettier-plugin-tailwindcss: "^0.6.11"`
-   `@google/generative-ai` (or the official Google AI SDK for Node.js - to be added)

## Tool Usage Patterns
-   **Cline:** For assistance with code scaffolding, reviews, documentation updates, and task management. Will interact with `cline_docs/` and `memory-bank/`.
-   **GitHub:** For all version control operations, pull requests, and code reviews.
-   **Expo CLI:** `expo start` for running the dev server, `expo prebuild` (if ejecting to Bare workflow or needing specific native configurations), and interfacing with EAS services.
-   **EAS Build (Expo Application Services):** For building the React Native application for distribution and deployment (post-MVP or for TestFlight).
-   **Vercel / Railway CLI:** For deploying the Next.js backend API. Deployment will be configured for automatic triggers on merge to the `main` branch.
-   **Linters/Formatters (ESLint, Prettier):**
    -   Configured for both `mobile-app` and `api-server`.
    -   `mobile-app`: Uses `.eslintrc.js` (with `@react-native/eslint-config`, `simple-import-sort`, Prettier integration) and `.prettierrc.js`.
    -   `api-server`: Uses `eslint.config.mjs` (Next.js default flat config with Prettier integration) and `.prettierrc.js` (with `prettier-plugin-tailwindcss`).
    -   NPM scripts (`lint`, `lint:fix`, `format`, `format:check`) added to `package.json` in both projects.

## Deployment
-   **React Native App:** Via EAS Build. Initial testing via Expo Go.
-   **Next.js Backend API:** Vercel or Railway.
