# Current Task: Phase 2 - Core Chat UI & Logic (SDK 53 Upgrade Complete, Basic Preview Working)

## Current Objective
With the `mobile-app` successfully upgraded to Expo SDK 53 and a minimal version previewable in Expo Go, the immediate next steps involve:
1.  Incrementally re-adding essential UI/UX dependencies, starting with `react-native-safe-area-context`.
2.  Proceeding with Task 2.2 (Refine `MessageBubble.tsx`) and Task 2.3 (Integrate API service for Gemini proxy).

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Phase 2: Core Chat UI & Logic (React Native - SDK 53).
-   **Previous Step (SDK 53 Upgrade & Basic Preview - Completed 2025-05-10):**
    -   Successfully upgraded `mobile-app` to Expo SDK 53.
    -   Simplified `App.tsx` and core dependencies (`expo: "^53.0.0"`, `react: "19.0.0"`, `react-native: "0.79.2"`, `expo-status-bar: "^2.2.3"`).
    -   Confirmed the app with this minimal setup is previewable in Expo Go.
    -   Task 2.1 (Basic Chat Screen UI components: `ChatScreen.tsx`, `MessageList.tsx`, `MessageBubble.tsx`, `MessageInput.tsx`) remains structurally complete.
-   **Relevant Document:** `cline_docs/projectRoadmap.md` (Tasks 2.1.1, 2.2, 2.3).

## Next Steps
1.  **Install and Integrate `react-native-safe-area-context` (Task 2.1.1, Part 1):**
    *   Run `npx expo install react-native-safe-area-context` in the `mobile-app` directory.
    *   Update `App.tsx` to re-include `SafeAreaProvider`.
    *   Thoroughly test in Expo Go on iOS to ensure compatibility and correct rendering.
2.  **(If SafeAreaProvider successful) Install and Integrate `react-native-gesture-handler` and `react-native-reanimated` (Task 2.1.1, Part 2 - if still needed for MVP):**
    *   Run `npx expo install react-native-gesture-handler react-native-reanimated`.
    *   Update `babel.config.js` to include `react-native-reanimated/plugin`.
    *   Update `app.json` to include the `react-native-reanimated` plugin.
    *   Update `App.tsx` to include `GestureHandlerRootView`.
    *   Test thoroughly in Expo Go on iOS.
3.  **Update Documentation:**
    *   Update `memory-bank/progress.md` and `memory-bank/activeContext.md` after each successful dependency integration.
    *   Update `cline_docs/codebaseSummary.md` if new significant patterns emerge.
4.  **Plan for Task 2.2/2.3:**
    *   **Task 2.2 (MessageItem/MessageBubble):** Review `MessageBubble.tsx`.
    *   **Task 2.3 (API Integration):**
        -   Create API service module in `mobile-app/src/services/`.
        -   Implement function to call deployed Next.js API.
        -   Integrate into `MessageInput.tsx` and `MessageList.tsx`.
5.  **Proceed with Task 2.2/2.3 implementation once dependencies are stable.**
