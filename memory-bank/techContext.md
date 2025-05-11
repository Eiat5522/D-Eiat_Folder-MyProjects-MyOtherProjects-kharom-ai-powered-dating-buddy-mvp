# Tech Context

## Core Technologies
-   **React Native (Expo Bare Workflow - SDK 53):**
    -   **Language:** TypeScript
    -   **Purpose:** Mobile application development for iOS (primary focus on Expo Go compatibility) and Android.
    -   **Current Status:** Successfully upgraded to Expo SDK 53.0.0. Running with minimal core dependencies. ESLint and Prettier configured.
-   **Next.js (App Router):**
    -   **Version:** 15.3.2
    -   **Language:** TypeScript
    -   **Purpose:** Backend API proxy to OpenRouter. Hosts API routes under `api-server/src/app/api/`.
    -   **Current Status:** Project created in `api-server/`. ESLint and Prettier configured. API operational with OpenRouter. Default model set via `OPENROUTER_DEFAULT_MODEL` (currently `qwen/qwen2-7b-instruct`).
-   **OpenRouter API:**
    -   **Purpose:** AI engine for generating Thai language chat responses, providing access to various models.
    -   **SDK/Client:** `openai` TypeScript SDK.
    -   **Default Model:** `qwen/qwen2-7b-instruct` (as of 2025-05-11, configured via environment variable `OPENROUTER_DEFAULT_MODEL`).
-   **Tailwind CSS:**
    -   **Purpose:** Styling for the Next.js backend (API project). Configured with `prettier-plugin-tailwindcss`. For React Native, default is `StyleSheet`.
-   **i18next:**
    -   **Purpose:** Integrated for internationalization and localization in the React Native app, supporting Thai and English UI.

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
-   **API Key Security:** OpenRouter API key (`OPENROUTER_API_KEY`) managed on Vercel (and locally in `.env.local`).
-   **Thai-Only AI Responses.**
-   **Stateless API Proxy.**

## Key Dependencies (Current - `mobile-app` using minimal set for SDK 53)

### React Native (Expo) App (`mobile-app` - SDK 53.0.0):
-   `expo: "^53.0.0"`
-   `react: "19.0.0"`
-   `react-native: "0.79.2"`
-   `expo-status-bar: "^2.2.3"`
-   `react-native-safe-area-context`: (version managed by `npx expo install`)
-   `i18next: "^25.1.2"` (Installed)
-   `react-i18next: "^15.5.1"` (Installed)
    -   `@react-native-async-storage/async-storage: "2.1.2"` (Installed)
    -   `react-native-svg: "15.11.2"` (Installed, used for icons)
    -   `@expo/vector-icons`: (Used in MessageInput and AppNavigator)
    -   `@react-navigation/native`: (Installed 2025-05-11)
    -   `@react-navigation/drawer`: (Installed 2025-05-11)
    -   `react-native-gesture-handler`: (Installed 2025-05-11)
    -   `react-native-reanimated`: (Installed 2025-05-11)
    -   `@gorhom/bottom-sheet`: (Installed 2025-05-11)
    -   `typescript: "^5.8.3"` (from package.json devDependencies)
    -   (`lucide-react-native` removed due to peer dependency conflict)
    -   **Dev Dependencies (ESLint/Prettier):**
    -   `@babel/core: "^7.20.0"`
    -   `@types/react: "~19.0.10"`
    -   (Other ESLint/Prettier related devDependencies as previously configured)

### Next.js API Backend (`api-server/`):
-   `next: "15.3.2"`
-   `react: "^19.0.0"`
-   `react-dom: "^19.0.0"`
-   `typescript: "^5"`
-   `tailwindcss: "^4"`
-   **OpenRouter Integration:** `openai: "^version_installed_by_npm"` (e.g., latest compatible version)
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
