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
- **User Testing (Initial):** User has tested Phase 3.4 and Phase 4 features. Functionality confirmed. Chat UI order now corrected and standard.
- Next immediate steps focus on **Phase 5 (Testing & Refinement)**.

## Recent Changes
- **(2025-05-11 - Chat UI Order Correction):**
    - Updated `ChatScreen.tsx` to prepend new messages to the `messages` array to ensure correct chronological display with `inverted` FlatList.
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
1.  **Phase 3.4 & Phase 4 Functionality Confirmed by User.**
2.  **Chat UI Order Corrected:** Newest messages now correctly appear at the bottom.
3.  **Update All Documentation:** (This is in progress).
4.  **Proceed to Phase 5: Testing & Refinement.**
    - Address any further bugs or UI polish points identified during more extensive testing.
5.  **Training Data Preprocessing:** Plan for cleaning `training_data/thai_dating_guide_scribd.md`.
6.  **API Service Naming:** `mobile-app/src/services/ChatApiService.ts` is current.

## Active Decisions & Considerations
- **Expo Go Compatibility (SDK 53):** Remains paramount.
- **MVP Scope:** Focus on core features.
- **Dependency Management:** Continue cautious addition and testing.
- **Thai-Only AI:** Enforced by the system prompt in the OpenRouter API.
- **API Key Security:** `OPENROUTER_API_KEY` managed via environment variables.
- **Model Choice:** Currently using `qwen/qwen2-7b-instruct` (as of 2025-05-11). Can be changed via `OPENROUTER_DEFAULT_MODEL` env var.
- **Scraped Data Preprocessing:** The scraped Markdown from Scribd (`training_data/thai_dating_guide_scribd.md`) contains UI elements from the source page and may require cleaning before use as AI training data.

## Important Patterns & Preferences
- **Iterative Development:** Continue building and testing features incrementally.
- **API Error Handling Pattern (Backend):** Established in `api-server/src/app/api/chat/route.ts`.

## Learnings & Project Insights
- Manual testing with `curl` is useful for quick API endpoint verification.
- Environment variable changes in Next.js (especially for Vercel deployments) require redeployment to take effect.
- Build issues can sometimes mask underlying runtime or configuration problems.
