# Current Task: AI Provider Switched to OpenRouter

## Current Objective
The AI provider for the backend API has been successfully switched from Google Gemini to OpenRouter. This allows for testing responses from various AI models.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Previous Task Focus:** Phase 3 (Localization) and Phase 4 (UX Feedback) were next. This OpenRouter migration was an ad-hoc request.
-   **Previous AI Provider:** Google Gemini.
-   **New AI Provider:** OpenRouter, accessed via the OpenAI SDK.

## Changes Implemented (2025-05-11)
-   **API Server (`api-server/`) Updated:**
    -   `api-server/.env.local` created with `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` placeholders.
    -   `openai` SDK installed.
    -   `api-server/src/app/api/chat/route.ts` modified:
        -   Replaced Google Gemini SDK with OpenAI SDK configured for OpenRouter.
        -   Updated request handling to transform `prompt` to `messages` array.
        -   Adapted response parsing and error handling for OpenRouter/OpenAI SDK.
-   **Documentation Updated:**
    -   `cline_docs/techStack.md`
    -   `memory-bank/techContext.md`
    -   `memory-bank/systemPatterns.md`
    -   `memory-bank/progress.md` (new "Phase X" added for this task)
    -   `cline_docs/codebaseSummary.md`
    -   This file (`cline_docs/currentTask.md`).

## Next Steps
1.  **Testing:**
    *   User to set actual `OPENROUTER_API_KEY` in `api-server/.env.local`.
    *   User to set `OPENROUTER_API_KEY` and `OPENROUTER_DEFAULT_MODEL` in Vercel environment variables for the `api-server` deployment.
    *   Redeploy `api-server` to Vercel.
    *   Thoroughly test the `/api/chat` endpoint (e.g., using Postman or curl).
    *   Test the full chat functionality with the mobile app connecting to the updated backend.
2.  **Resume Planned Tasks:** Once OpenRouter integration is confirmed working, proceed with:
    *   **Phase 3: Localization (Task 3.1: Integrate i18next)**.
    *   **Phase 4: UX Feedback Mechanisms (Task 4.1: Full Thumbs-up/down logic, Task 4.2: Retry, Task 4.3: Refine errors)**.
3.  **Update Documentation:**
    *   Update `memory-bank/progress.md` and `memory-bank/activeContext.md` after testing and resuming planned tasks.

## Active Decisions & Considerations
-   The mobile app's `GeminiApiService.ts` was not changed in this step; the backend handles the adaptation. Consider renaming this service if it becomes confusing.
-   The default OpenRouter model is set via `OPENROUTER_DEFAULT_MODEL`. For more flexible model testing, the API could be enhanced to accept a model choice from the client.
