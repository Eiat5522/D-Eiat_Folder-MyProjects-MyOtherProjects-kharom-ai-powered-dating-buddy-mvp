# Active Context

## Current Work Focus
-   **Addressing Gemini Language Bias (Task ID: `1746904477439`):** The primary focus is on resolving the issue where the `gemini-1.5-flash-latest` model responds in the language of the user's input rather than consistently in Thai.
    -   **Strategy:** Implement a combined approach of strengthening the `systemInstruction` and wrapping the user's prompt with explicit Thai-only directives in `api-server/src/app/api/chat/route.ts`.
-   **Mobile App (`mobile-app`):** Expo SDK 53. Core chat functionality (Tasks 2.1-2.4) is implemented.
-   **Git:** `main` branch is up-to-date with SDK 53 upgrade and initial system prompt integration.

## Recent Changes
-   **(2025-05-11 - Planning for Language Bias):**
    -   Investigated the Gemini language bias issue.
    -   Formulated a plan involving strengthening system instructions and prompt wrapping.
    -   Added new task (`1746904477439`) to the software plan for this combined approach.
    -   Updated `cline_docs/currentTask.md`.
-   **(2025-05-11 - System Prompt & Git - Previous):**
    -   Integrated initial system prompt for KhaRom AI persona into `api-server/src/app/api/chat/route.ts`.
    -   Committed and pushed changes to `main`, triggering Vercel deployment.
    -   Successfully merged `sdk-53-upgrade` branch into `main`.
    -   Pushed updated `main` branch to remote repository.
-   **(2025-05-10 - Core Chat Functionality Implementation - Tasks 2.1, 2.2, 2.3, 2.4):**
    -   Created `mobile-app/src/services/GeminiApiService.ts`.
    -   Updated `ChatScreen.tsx`, `MessageInput.tsx`, `MessageList.tsx`, `MessageBubble.tsx`.
    -   Successfully tested core chat flow.
-   **(2025-05-10 - Dependency Management & SDK 53 Upgrade):**
    -   Upgraded `mobile-app` to Expo SDK 53.
    -   Integrated `react-native-safe-area-context`, `react-native-svg`.
-   **(Previously on 2025-05-10 - Phase 1 Completion):**
    -   Backend API Proxy (Next.js) completed and deployed. Production API: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`

## Next Steps (Immediate & Upcoming)
1.  **Implement Combined Strategy for Language Bias (Task ID: `1746904477439`):**
    *   Modify `api-server/src/app/api/chat/route.ts` with strengthened `systemInstruction` and prompt wrapping.
    *   Thoroughly test with non-Thai inputs.
2.  **If Necessary, Investigate Further (Contingency):**
    *   Chat History Priming (Task ID: `1746904287226`).
    *   Two-Step Translation Fallback (Task ID: `1746904295417`).
3.  **Commit and Push Documentation Updates to GitHub.**
4.  **Proceed with Phase 3: Localization (Task 3.1: Integrate i18next) once language bias is resolved.**
5.  **Proceed with Phase 4: UX Feedback Mechanisms (Task 4.1, 4.2, 4.3) once language bias is resolved.**
6.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**
7.  **Update all documentation files to reflect current project state (Ongoing).**

## Active Decisions & Considerations
-   **Language Consistency:** Achieving reliable Thai-only AI responses is the current top priority.
-   **Expo Go Compatibility (SDK 53):** Remains critical.
-   **MVP Scope:** Maintain focus on core features.

## Important Patterns & Preferences
-   Iterative development and testing.
-   Clear, explicit prompting for AI models.
-   Secure API key management.

## Learnings & Project Insights
-   LLMs can be sensitive to the language and structure of the immediate prompt, sometimes overriding broader system instructions.
-   Multi-layered prompting strategies (system instruction + prompt engineering) might be necessary for strict output control.
-   Continuous documentation is vital for tracking evolving issues and plans.
