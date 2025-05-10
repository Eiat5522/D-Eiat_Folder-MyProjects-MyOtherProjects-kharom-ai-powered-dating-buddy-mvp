# Active Context

## Current Work Focus
- Successfully upgraded `mobile-app` to **Expo SDK 53**. The app is now previewable in Expo Go with a minimal set of core dependencies.
- Continuing with **Phase 2: Core Chat UI & Logic (React Native)** from `projectRoadmap.md`.
- Next immediate step is to re-integrate essential UI/UX packages, starting with `react-native-safe-area-context`.

## Recent Changes
- **(Latest Changes as of 2025-05-10 - SDK 53 Upgrade & Basic Preview):**
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
1.  **Incrementally Add Dependencies to `mobile-app` (SDK 53):**
    *   **Install and Integrate `react-native-safe-area-context`:**
        *   Run `npx expo install react-native-safe-area-context`.
        *   Update `App.tsx` to re-include `SafeAreaProvider`.
        *   Test thoroughly in Expo Go on iOS.
    *   **(If SafeAreaProvider successful) Install and Integrate `react-native-gesture-handler` and `react-native-reanimated` (if still deemed necessary for MVP features):**
        *   Run `npx expo install react-native-gesture-handler react-native-reanimated`.
        *   Update `babel.config.js` to include `react-native-reanimated/plugin`.
        *   Update `app.json` to include the `react-native-reanimated` plugin.
        *   Update `App.tsx` to include `GestureHandlerRootView`.
        *   Test thoroughly in Expo Go on iOS.
2.  **Refine `MessageBubble.tsx` (Task 2.2):**
    *   Review `MessageBubble.tsx` against any specific requirements for `MessageItem` from the roadmap.
    *   Make necessary adjustments or confirm completion of Task 2.2.
3.  **Integrate API Service (Task 2.3):**
    *   Create an API service module in `mobile-app/src/services/`.
    *   Implement a function within the service to call the deployed Next.js API proxy.
    *   Integrate this service into `MessageInput.tsx` to handle sending user messages.
    *   Modify `MessageList.tsx` and `ChatScreen.tsx` (or introduce state management) to handle dynamic message data from API responses, replacing mock data.
4.  **Implement Loading States & Basic Error Display (Task 2.4):**
    *   Add loading indicators in `MessageInput.tsx` or `ChatScreen.tsx` while waiting for API responses.
    *   Display basic error messages in the UI if API calls fail.
5.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing):**
    *   Continuously test all new features and changes in Expo Go on an iOS device.

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
