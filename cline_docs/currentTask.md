# Current Task: Phase 2 - Core Chat UI & Logic (Task 2.1 Completed)

## Current Objective
With the basic Chat Screen UI components (Task 2.1) implemented and `App.tsx` updated to render `ChatScreen`, the immediate next steps involve:
1.  Ensuring the Expo development server for `mobile-app` is running correctly so the user can view the UI.
2.  Preparing for Task 2.2: Refine `MessageBubble.tsx` (already created, but may need adjustments based on roadmap's `MessageItem` concept) and Task 2.3: Integrate API service for Gemini proxy.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Phase 2: Core Chat UI & Logic (React Native).
-   **Previous Step (Task 2.1 - Completed 2025-05-10):**
    -   Created `ChatScreen.tsx`, `MessageList.tsx`, `MessageBubble.tsx`, and `MessageInput.tsx` in `mobile-app/src/components/`.
    -   Updated `ChatScreen.tsx` to import `MessageList` and `MessageInput`.
    -   Updated `MessageList.tsx` to import `MessageBubble`.
    -   Updated `mobile-app/App.tsx` to render `ChatScreen`.
    -   Started the Expo development server for `mobile-app`.
-   **Relevant Document:** `cline_docs/projectRoadmap.md` (Tasks 2.2, 2.3).
-   The `MessageBubble.tsx` component serves a similar purpose to the `MessageItem` mentioned in Task 2.2 of the roadmap. We should confirm if further refinement is needed or if `MessageBubble.tsx` fulfills the requirements for Task 2.2.

## Next Steps
1.  **Verify Expo Go UI:**
    *   Confirm with the user that they can see the basic chat UI in Expo Go on their iOS device.
    *   Address any immediate rendering issues if reported.
2.  **Update Documentation:**
    *   Update `memory-bank/progress.md` to reflect completion of Task 2.1.
    *   Update `memory-bank/activeContext.md` with the current focus on Phase 2.
    *   Update `cline_docs/codebaseSummary.md` with new components.
3.  **Plan for Task 2.2/2.3:**
    *   **Task 2.2 (MessageItem/MessageBubble):** Review `MessageBubble.tsx` against any specific requirements for `MessageItem` from the roadmap. Decide if further changes are needed or if it's complete.
    *   **Task 2.3 (API Integration):**
        -   Create an API service module in `mobile-app/src/services/`.
        -   Implement a function to call the deployed Next.js API proxy (`https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`).
        -   Integrate this service into `MessageInput.tsx` to send user messages.
        -   Update `MessageList.tsx` to display actual messages from the state (which will be populated by API responses).
4.  **Proceed with Task 2.2/2.3 implementation.**
