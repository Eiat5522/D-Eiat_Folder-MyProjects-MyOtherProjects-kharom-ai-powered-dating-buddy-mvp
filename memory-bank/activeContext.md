# Active Context

## Current Work Focus
- Successfully upgraded `mobile-app` to **Expo SDK 53**.
- Successfully integrated `react-native-safe-area-context` into `mobile-app`.
- **Core chat functionality (sending messages, receiving AI replies, basic loading/error states, feedback icons) implemented in `mobile-app` and was tested with the previous Gemini backend.**
- **API Server (`api-server`) has been migrated from Google Gemini to OpenRouter.**
    - Uses OpenAI SDK to interact with OpenRouter.
    - Configured with `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` (currently `mistralai/mistral-small-24b-instruct-2501`).
    - System prompt for "Thai Dating Guru" persona implemented.
    - Manual `curl` tests confirm API responds in Thai to English prompts.
- **Tailwind CSS configuration issues in `api-server` have been resolved.**
- **Playwright testing setup has been removed from `api-server` as per user request.**
- Next immediate steps focus on **Phase 3 (Localization)** and further refinement of **Phase 4 (UX Feedback)** in the `mobile-app`.

## Recent Changes
- **(2025-05-11 - API Migration & Testing):**
    - Switched AI provider from Google Gemini to OpenRouter in `api-server/src/app/api/chat/route.ts`.
    - Installed `openai` SDK in `api-server`.
    - Added `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` to `.env.local` and `next.config.ts`.
    - Implemented "Thai Dating Guru" system prompt in the API route.
    - Resolved Tailwind CSS build issues in `api-server`.
    - Manually tested the `/api/chat` endpoint with `curl` and confirmed Thai-only responses.
    - Removed Playwright testing setup (`@playwright/test` dependency, config files, test files, and test-related directories) from `api-server`.
- **(2025-05-10 - API Integration, MessageBubble Refinement, Basic States - Tasks 2.2, 2.3, 2.4):**
    - Created `mobile-app/src/services/GeminiApiService.ts` (to be renamed).
    - Updated `ChatScreen.tsx`, `MessageInput.tsx`, `MessageList.tsx`, `MessageBubble.tsx`.
    - Successfully tested core chat flow with the Gemini backend.
- **(2025-05-10 - Dependency Management Update):**
    - Deferred `react-native-gesture-handler` and `react-native-reanimated`.
    - Used `react-native-svg` for icons.
- **(2025-05-10 - `react-native-safe-area-context` Integration):**
    - Integrated and verified.
- **(Previously on 2025-05-10 - SDK 53 Upgrade & Basic Preview):**
    - Resolved Expo SDK 53 upgrade issues for `mobile-app`.
    - Confirmed `mobile-app` preview in Expo Go.
- **Phase 1 "Backend API Proxy (Next.js)" fully completed (originally for Gemini, now adapted for OpenRouter).**

## Next Steps
1.  **Thoroughly test the `mobile-app` with the updated OpenRouter backend.**
    *   Ensure `GeminiApiService.ts` (or its renamed version) correctly calls the API.
    *   Verify all chat functionalities (sending, receiving, loading, errors, feedback icons) work as expected.
2.  **Rename `mobile-app/src/services/GeminiApiService.ts`** to something more generic like `ApiService.ts` or `OpenRouterApiService.ts` to reflect the backend change.
3.  **Proceed with Phase 3: Localization (Task 3.1: Integrate i18next).**
4.  **Proceed with Phase 4: UX Feedback Mechanisms (Task 4.1: Full Thumbs-up/down logic, Task 4.2: Retry, Task 4.3: Refine errors).**
5.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**

## Active Decisions & Considerations
- **Expo Go Compatibility (SDK 53):** Remains paramount.
- **MVP Scope:** Focus on core features.
- **Dependency Management:** Continue cautious addition and testing.
- **Thai-Only AI:** Enforced by the system prompt in the OpenRouter API.
- **API Key Security:** `OPENROUTER_API_KEY` managed via environment variables.
- **Model Choice:** Currently using `mistralai/mistral-small-24b-instruct-2501`. Can be changed via `OPENROUTER_DEFAULT_MODEL` env var.

## Important Patterns & Preferences
- **Iterative Development:** Continue building and testing features incrementally.
- **API Error Handling Pattern (Backend):** Established in `api-server/src/app/api/chat/route.ts`.

## Learnings & Project Insights
- Manual testing with `curl` is useful for quick API endpoint verification.
- Environment variable changes in Next.js (especially for Vercel deployments) require redeployment to take effect.
- Build issues can sometimes mask underlying runtime or configuration problems.
