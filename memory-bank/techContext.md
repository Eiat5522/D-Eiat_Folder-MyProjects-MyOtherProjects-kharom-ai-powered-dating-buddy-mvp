# Tech Context

## Core Technologies
-   **React Native (Expo Bare Workflow - SDK 53):**
    -   **Language:** TypeScript
    -   **Purpose:** Mobile application development for iOS (primary focus on Expo Go compatibility) and Android.
    -   **Current Status:** Successfully upgraded to Expo SDK 53.0.0. Core chat functionality implemented. ESLint and Prettier configured.
-   **Next.js (App Router):**
    -   **Version:** 15.3.2
    -   **Language:** TypeScript
    -   **Purpose:** Backend API proxy to Google Gemini. Hosts API routes under `api-server/src/app/api/`.
    -   **Current Status:** Project created and API deployed to Vercel. ESLint and Prettier configured.
-   **Google Gemini API:**
    -   **SDK:** `@google/generative-ai` (e.g., `^0.3.0` or latest compatible) used in `api-server`.
    -   **Purpose:** AI engine for generating Thai language chat responses.
-   **Tailwind CSS:**
    -   **Purpose:** Styling for the Next.js backend (API project). For React Native, default is `StyleSheet`.
-   **i18next:** (Planned)
    -   **Purpose:** Internationalization and localization for the React Native app.

## Development Setup & Environment
-   **Version Control:** Git, hosted on GitHub. `main` branch reflects current stable state.
-   **Package Managers:** `npm` used for both projects.
-   **Expo CLI:** For managing the Expo project.
-   **Node.js:** LTS version recommended.
-   **IDE:** Visual Studio Code.
-   **Testing Environment:**
    -   **Primary:** Expo Go app on a physical iOS device.

## Technical Constraints
-   **Expo Go iOS App Compatibility (SDK 53):** Paramount.
-   **No Firebase/Supabase.**
-   **API Key Security:** Google Gemini API key managed on Vercel.
-   **Thai-Only AI Responses:** To be enforced via `systemInstruction`.
-   **Stateless API Proxy.**

## Key Dependencies

### React Native (Expo) App (`mobile-app` - SDK 53.0.0):
-   `expo: "^53.0.0"`
-   `react: "19.0.0"`
-   `react-native: "0.79.2"`
-   `expo-status-bar: "^2.2.3"` (or as per `npx expo install --fix`)
-   `react-native-safe-area-context`: (version managed by `npx expo install`)
-   `react-native-svg`: (version managed by `npx expo install`)
-   `@expo/vector-icons`: (version managed by `npx expo install`)
-   `typescript: "^5.3.0"` (or as per `npx expo install --fix` for SDK 53 compatibility)
-   **Dev Dependencies (ESLint/Prettier):** Standard configurations compatible with React Native/TypeScript.
-   **To be added (Phase 3+):**
    -   `i18next`
    -   `react-i18next`

### Next.js API Backend (`api-server/`):
-   `next: "15.3.2"`
-   `react: "^19.0.0"`
-   `react-dom: "^19.0.0"`
-   `typescript: "^5"`
-   `tailwindcss: "^4"`
-   `@google/generative-ai: "^0.3.0"` (or latest compatible)
-   **Dev Dependencies (ESLint/Prettier):** Standard configurations compatible with Next.js/TypeScript.

## Tool Usage Patterns
-   **Cline:** For assistance with code scaffolding, reviews, documentation updates.
-   **GitHub:** For version control.
-   **Expo CLI:** `expo start`, `npx expo install`.
-   **EAS Build:** (Planned for future builds).
-   **Vercel:** For deploying the Next.js backend API.
-   **Linters/Formatters:** ESLint, Prettier.

## Deployment
-   **React Native App:** Testing via Expo Go. Future builds via EAS Build.
-   **Next.js Backend API:** Vercel. Production URL: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`.
