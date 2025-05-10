# Tech Context

## Core Technologies
-   **React Native (Expo Bare Workflow - SDK 53):**
    -   **Language:** TypeScript
    -   **Purpose:** Mobile application development for iOS (primary focus on Expo Go compatibility) and Android.
    -   **Current Status:** Successfully upgraded to Expo SDK 53.0.0. Running with minimal core dependencies. ESLint and Prettier configured.
-   **Next.js (App Router):**
    -   **Version:** 15.3.2
    -   **Language:** TypeScript
    -   **Purpose:** Backend API proxy to Google Gemini. Hosts API routes under `api-server/src/app/api/`.
    -   **Current Status:** Project created in `api-server/`. ESLint and Prettier configured. API deployed.
-   **Google Gemini API:**
    -   **Purpose:** AI engine for generating Thai language chat responses.
-   **Tailwind CSS:**
    -   **Purpose:** Styling for the Next.js backend (API project). Configured with `prettier-plugin-tailwindcss`. For React Native, default is `StyleSheet`.
-   **i18next:**
    -   **Purpose:** Internationalization and localization for the React Native app, supporting Thai and English UI. (To be integrated)

## Development Setup & Environment
-   **Version Control:** Git, hosted on GitHub.
-   **Package Managers:** `npm` for both React Native (Expo) and Next.js projects.
-   **Expo CLI:** For managing the Expo project, running the development server, and building with EAS Build.
-   **Node.js:** Required for running Expo, Next.js, and associated tooling. LTS version recommended.
-   **IDE:** Visual Studio Code.
-   **Testing Environment:**
    -   **Primary:** Expo Go app on a physical iOS device.
    -   Simulators/Emulators for iOS and Android as secondary.

## Technical Constraints
-   **Expo Go iOS App Compatibility (SDK 53):** Paramount constraint.
-   **No Firebase/Supabase.**
-   **API Key Security:** Google Gemini API key managed on Vercel.
-   **Thai-Only AI Responses.**
-   **Stateless API Proxy.**

## Key Dependencies (Current - `mobile-app` using minimal set for SDK 53)

### React Native (Expo) App (`mobile-app` - SDK 53.0.0):
-   `expo: "^53.0.0"`
-   `react: "19.0.0"`
-   `react-native: "0.79.2"`
-   `expo-status-bar: "^2.2.3"`
-   `typescript: "^5.8.3"` (from package.json devDependencies)
-   **Dev Dependencies (ESLint/Prettier):**
    -   `@babel/core: "^7.20.0"`
    -   `@types/react: "~19.0.10"`
    -   (Other ESLint/Prettier related devDependencies as previously configured, assuming they are compatible or will be updated as needed)
-   **To be added incrementally:**
    -   `react-native-safe-area-context`
    -   `react-native-gesture-handler`
    -   `react-native-reanimated`
    -   `i18next`
    -   `react-i18next`
    -   `react-navigation` packages

### Next.js API Backend (`api-server/`):
-   `next: "15.3.2"`
-   `react: "^19.0.0"`
-   `react-dom: "^19.0.0"`
-   `typescript: "^5"`
-   `tailwindcss: "^4"`
-   **Google Gemini Integration:** `@google/generative-ai: "^0.3.0"`
-   (ESLint/Prettier devDependencies as previously configured)

## Tool Usage Patterns
-   **Cline:** For assistance with code scaffolding, reviews, documentation updates, and task management.
-   **GitHub:** For all version control operations.
-   **Expo CLI:** `expo start` for running the dev server, `npx expo install` for adding compatible packages.
-   **EAS Build (Expo Application Services):** For future builds.
-   **Vercel CLI:** For deploying the Next.js backend API.
-   **Linters/Formatters (ESLint, Prettier):** Configured for both projects.

## Deployment
-   **React Native App:** Via EAS Build (future). Initial testing via Expo Go.
-   **Next.js Backend API:** Vercel. Production URL: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`.
