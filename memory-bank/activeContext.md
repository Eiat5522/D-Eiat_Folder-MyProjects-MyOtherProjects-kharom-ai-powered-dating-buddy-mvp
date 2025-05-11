# Active Context

## Current Work Focus
- Successfully upgraded `mobile-app` to **Expo SDK 53**.
- Successfully integrated `react-native-safe-area-context` into `mobile-app`.
- **Core chat functionality (sending messages, receiving AI replies, basic loading/error states, feedback icons) implemented in `mobile-app` and was tested with the previous Gemini backend.**
- **API Server (`api-server`) has been migrated from Google Gemini to OpenRouter.**
    - Uses OpenAI SDK to interact with OpenRouter.
    - Configured with `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` (currently `qwen/qwen2-7b-instruct` as of 2025-05-11).
    - System prompt for "Thai Dating Guru" persona implemented.
    - Manual `curl` tests confirm API responds in Thai to English prompts.
- **Tailwind CSS configuration issues in `api-server` have been resolved.**
- **Playwright testing setup has been removed from `api-server` as per user request.**
- Full integration testing with the `mobile-app` via Expo Go is now complete and successful after resolving an API key configuration issue on Vercel and in `next.config.ts`.
- **Successfully scraped Scribd document for training data and saved as `training_data/thai_dating_guide_scribd.md`.**
- **Phase 3 (Localization) initial implementation is complete.**
- **Phase 3.4 (Hamburger Menu & Navigation) is complete.**
- **Phase 4 (UX Feedback Mechanisms) is complete.**
- **Chat UI Order Corrected (2025-05-11):** Modified `ChatScreen.tsx` to prepend new messages to the state array, ensuring correct visual order (newest at bottom) with the `inverted` FlatList.
- **User Testing (Initial):** User has tested Phase 3.4 and Phase 4 features. Functionality confirmed.
- **Session-Based Chat History (Phase C) Implementation Complete (2025-05-11):** All sub-tasks for implementing chat history (data storage, context, UI screens, navigation, ChatScreen refactor, localization) are done. Latest refinements include persistent custom titles and an optimized two-line display format.
- Current focus is now **Phase 5: Testing & Refinement (Expanded)** for all implemented features including chat history.

## Recent Changes
- **(2025-05-11 - Late Evening - Chat History Refinements):**
    -   Added `hasCustomTitle` flag to track renamed sessions.
    -   Updated `AppNavigator.tsx` to preserve custom titles in the active chat header.
    -   Refined chat history display to a clean two-line format (snippet/title + timestamp).
    -   Ensured custom titles persist after new messages in both views.
- **(2025-05-11 - Phase C: Session-Based Chat History Implementation):**
    -   Created `SessionStorageService.ts` for `AsyncStorage` operations (CRUD for sessions).
    -   Developed `SessionContext.tsx` for managing active session, list of sessions, and related actions.
    -   Integrated `SessionProvider` into `App.tsx`.
    -   Built `ChatHistoryScreen.tsx` featuring session list display, swipe-to-reveal actions (rename/delete), and a FAB for creating new chats.
    -   Updated `AppNavigator.tsx` to include `ChatHistoryScreen` and a "New Chat" option in the drawer menu.
    -   Refactored `ChatScreen.tsx` to be session-aware, using `SessionContext` for message display and persistence. Implemented auto-creation of a new session if none is active.
    -   Updated `handleFeedback` in `ChatScreen.tsx` to persist feedback to the active session via context.
    -   Added new localization keys for chat history features to `en.json` and `th.json`.
- **(2025-05-11 - Chat UI Order Correction - Earlier):**
    - Updated `ChatScreen.tsx` to prepend new messages to the `messages` array to ensure correct chronological display with `inverted` FlatList. (This change was part of the old ChatScreen logic before session context).
- **(2025-05-11 - Phase 3.4 Hamburger Menu & Phase 4 UX Feedback - Earlier):**
    - **Navigation & Drawer:**
        - Installed navigation dependencies.
        - Configured `AppNavigator.tsx` with a drawer, custom content for language toggle.
        - Added hamburger icon to `ChatScreen.tsx` header.
        - Wrapped `App.tsx` in `GestureHandlerRootView` and `BottomSheetModalProvider`.
    - **Thumbs-up/down & Detailed Feedback (Task 4.1):**
        - Installed `@gorhom/bottom-sheet`.
        - Updated `ChatMessage` interface for feedback fields.
        - `ChatScreen.tsx` now manages feedback state.
        - `MessageBubble.tsx` displays feedback state and uses `BottomSheetModal` for detailed feedback collection on "dislike".
        - Added new i18next keys for feedback UI.
    - **Retry Mechanism (Task 4.2):**
        - Implemented `lastFailedPrompt` state and `handleRetry` logic in `ChatScreen.tsx`.
        - Added "Retry" button to error display.
    - **Refined Error Messages (Task 4.3):**
        - Added i18next keys for various error types.
        - `ChatScreen.tsx` now displays localized error messages.
    - Updated `en.json` and `th.json` with all new translation keys.
- **(2025-05-11 - Phase 3 Localization Implementation - Earlier):**
    - Installed `i18next`, `react-i18next`, `@react-native-async-storage/async-storage`.
    - Created `mobile-app/src/localization/i18n.ts`, `locales/en.json`, `locales/th.json`.
    - Created `mobile-app/src/context/LanguageContext.tsx`.
    - Updated `App.tsx` and `MessageInput.tsx`.
- **(2025-05-11 - Training Data Scraping - Earlier):**
    - Used `firecrawl_scrape` MCP tool.
    - Created `training_data/` directory and saved to `training_data/thai_dating_guide_scribd.md`.
- **(2025-05-11 - API Migration & Testing - Earlier):**
    - Switched AI provider to OpenRouter.
    - Updated `api-server` and environment variables.
    - Resolved API key configuration issues for Vercel deployment.
- **(2025-05-10 - Core Chat Flow & SDK 53 Upgrade - Earlier):**
    - Implemented core chat UI and logic.
    - Upgraded to Expo SDK 53.

## Next Steps
1.  **Comprehensive User Testing (Phase 5.1):** Focus on all features, especially the new Chat History functionality (creation, loading, continuation, rename, delete, swipe actions, persistence).
2.  **Bug Fixing & UI Polish (Phase 5.2):** Address issues found during testing.
3.  **Code Reviews (Phase 5.3):** Review chat history implementation and related changes.
4.  **Final Documentation Updates (Memory Bank & codebaseSummary.md):** Ensure all docs are up-to-date. (This is in progress for `cline_docs`).
5.  **Training Data Preprocessing:** User will handle this separately.

## Active Decisions & Considerations
- **Expo Go Compatibility (SDK 53):** Remains paramount for all features, including new chat history UI and interactions.
- **Chat Session Display:** Two-line format in history view (snippet/title + timestamp). Custom titles take precedence over snippets when set.
- **MVP Scope:** Chat history is now considered part of MVP.
- **Dependency Management:** `react-native-gesture-handler` and `react-native-reanimated` used for swipe actions. No new major UI dependencies added for chat history beyond these.
- **AsyncStorage for Chat History:** Chat sessions are stored locally. Performance with a very large number of sessions/messages is a post-MVP consideration.
- **Session Titling:** Defaults to "New Chat [timestamp]". Future enhancement for content-derived titles.
- **Feedback Persistence:** Message feedback is now saved within the respective chat session data in AsyncStorage.
- **Thai-Only AI:** Enforced by the system prompt in the OpenRouter API.
- **API Key Security:** `OPENROUTER_API_KEY` managed via environment variables.
- **Model Choice:** Currently using `qwen/qwen2-7b-instruct`.

## Important Patterns & Preferences
- **Iterative Development:** Continue building and testing features incrementally.
- **API Error Handling Pattern (Backend):** Established in `api-server/src/app/api/chat/route.ts`.

## Learnings & Project Insights
- Manual testing with `curl` is useful for quick API endpoint verification.
- Environment variable changes in Next.js (especially for Vercel deployments) require redeployment to take effect.
- Build issues can sometimes mask underlying runtime or configuration problems.
- Careful state management and clear separation of concerns (e.g. `SessionStorageService` vs `SessionContext`) are crucial when adding complex features like session management.
- Iterative implementation of context functions (one by one) helps manage complexity.
