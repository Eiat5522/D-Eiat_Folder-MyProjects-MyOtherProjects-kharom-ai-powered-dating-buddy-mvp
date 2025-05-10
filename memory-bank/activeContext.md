# Active Context

## Current Work Focus
- Successfully upgraded `mobile-app` to **Expo SDK 53**.
- Successfully integrated `react-native-safe-area-context` into `mobile-app`.
- **Core chat functionality (sending messages, receiving AI replies, basic loading/error states, feedback icons) implemented and tested successfully in Expo Go (iOS) as of 2025-05-10.** This covers Task 2.2 (feedback icons), Task 2.3 (API integration), and initial parts of Task 2.4 (loading/error states).
- Continuing with **Phase 2: Core Chat UI & Logic (React Native)** from `projectRoadmap.md`.
- Integration of `react-native-gesture-handler` and `react-native-reanimated` remains deferred.
- Next immediate steps focus on **Phase 3 (Localization)** and further refinement of **Phase 4 (UX Feedback)**.

## Recent Changes
- **(2025-05-10 - API Integration, MessageBubble Refinement, Basic States - Tasks 2.2, 2.3, 2.4):**
    - Created `mobile-app/src/services/GeminiApiService.ts` to handle API calls.
    - Updated `ChatScreen.tsx` to manage message state, call the API service, and handle loading/error states.
    - Updated `MessageInput.tsx` to use the `onSend` prop from `ChatScreen.tsx`.
    - Updated `MessageList.tsx` to display dynamic messages and pass `onFeedback` prop.
    - Updated `MessageBubble.tsx` to use inline SVGs for feedback icons (after `lucide-react-native` issues) and connect to `onFeedback` handler.
    - Successfully tested sending messages, receiving AI replies, loading indicators, basic error display, and feedback icon visibility.
- **(2025-05-10 - Dependency Management Update):**
    - Decided to defer integration of `react-native-gesture-handler` and `react-native-reanimated`.
    - Pivoted to using `react-native-svg` for icons due to issues with `lucide-react-native` installation/peer dependencies.
- **(2025-05-10 - `react-native-safe-area-context` Integration):**
    - Installed `react-native-safe-area-context`.
    - Updated `mobile-app/App.tsx` to use `SafeAreaProvider`.
    - Verified successful integration.
- **(Previously on 2025-05-10 - SDK 53 Upgrade & Basic Preview):**
    - **Expo SDK 53 Upgrade:**
        - Resolved multiple dependency and configuration issues to make `mobile-app` compatible with Expo SDK 53.
        - Simplified `App.tsx` and `package.json` to a minimal working set:
            - `expo: "^53.0.0"`
            - `react: "19.0.0"`
            - `react-native: "0.79.2"`
            - `expo-status-bar: "^2.2.3"`
        - Updated `app.json` to reflect `sdkVersion: "53.0.0"` and removed problematic plugins temporarily.
        - Updated `babel.config.js` to a minimal configuration.
        - Ensured `metro.config.js` uses the default Expo config.
    - **App Previewable:** Confirmed that the `mobile-app` with the simplified setup and SDK 53 can be previewed in Expo Go.
    - **Task 2.1 "Implement Chat Screen UI (Message Input, List)" remains complete:**
        - `ChatScreen.tsx`, `MessageList.tsx`, `MessageBubble.tsx`, `MessageInput.tsx` are structurally in place.
        - `App.tsx` renders `ChatScreen`.
- **Phase 1 "Backend API Proxy (Next.js)" fully completed:**
    - Production API endpoint: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`

## Next Steps
1.  **Dependency Integration Status (Task 2.1.1):**
    *   **`react-native-safe-area-context` (COMPLETED).**
    *   **`react-native-gesture-handler` and `react-native-reanimated` (DEFERRED).**
    *   **`react-native-svg` (USED):** Implemented for icons; installation status in `package.json` is problematic but functionally working.
2.  **Refine `MessageBubble.tsx` (Task 2.2 - Feedback Icons COMPLETED).**
3.  **Integrate API Service (Task 2.3 - COMPLETED).**
4.  **Implement Loading States & Basic Error Display (Task 2.4 - Basic implementation COMPLETED).**
    *   Further refinement of error messages and retry mechanisms will be part of Task 4.2 and 4.3.
5.  **Proceed with Phase 3: Localization (Task 3.1: Integrate i18next).**
6.  **Proceed with Phase 4: UX Feedback Mechanisms (Task 4.1: Full Thumbs-up/down logic, Task 4.2: Retry, Task 4.3: Refine errors).**
7.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**

## Active Decisions & Considerations
- **Expo Go Compatibility (SDK 53):** All development choices must prioritize smooth operation within Expo Go on iOS with the new SDK.
- **MVP Scope:** Focus strictly on core features: AI chat, language toggle, and UX feedback.
- **Dependency Management:** Add dependencies one by one and test thoroughly to avoid conflicts with SDK 53.
- **Thai-Only AI:** The AI interaction is exclusively in Thai.
- **Security:** API keys for Google Gemini remain environment-protected on Vercel.

## Important Patterns & Preferences
- **Iterative Dependency Addition:** Given the challenges with the SDK upgrade, adding and testing dependencies individually is crucial.
- **API Error Handling Pattern (Backend):** Remains as previously defined.
- **Response Structure (Backend):** Remains as previously defined.

## Learnings & Project Insights
- Upgrading Expo SDK versions (e.g., from 51 to 53) can be complex and require careful attention to:
    - Core dependency versions (`expo`, `react`, `react-native`).
    - Expo package versions (`expo-status-bar`, etc.).
    - Configuration files (`app.json`, `babel.config.js`, `metro.config.js`).
    - Plugin compatibility.
- Starting with a minimal set of dependencies and incrementally adding more is a robust strategy for troubleshooting SDK compatibility issues.
- Tunneling issues (e.g., Ngrok `EPERM` errors) can sometimes be bypassed by testing on the local network first, then addressing tunneling separately if needed.
- Clear and explicit `cd` paths in commands are important, especially when working with nested project structures.
