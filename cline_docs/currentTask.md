# Current Task: Implement error handling for Gemini calls (Phase 1 - Task 1.3)

## Current Objective
Start **Task 1.3** from `projectRoadmap.md`: Implement error handling for Gemini calls.
This is the third task in **Phase 1: Backend API Proxy (Next.js)**.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Phase 1: Backend API Proxy (Next.js).
-   **Previous Step (Task 1.2 - Completed 2025-05-10):**
    -   Installed Google Gemini SDK (`@google/generative-ai`) in `api-server`.
    -   Created `userInstructions/03_setup_gemini_api_key.md` to guide user on setting `GEMINI_API_KEY`.
    -   Modified `api-server/src/app/api/chat/route.ts` to:
        -   Initialize Gemini client using the API key.
        -   Send prompt to Gemini API.
        -   Return Gemini response or a basic error.
    -   Attempted manual testing, but encountered issues with running/observing the `api-server` dev server.
    -   Committed changes for Task 1.2.
-   **Relevant Document:** `cline_docs/projectRoadmap.md` (Task 1.3).
-   **Known Issue:** Difficulties in reliably starting and observing the `api-server` development server within the integrated terminal. This may impact testing for Task 1.3.

## Next Steps for Task 1.3
1.  **Review Gemini SDK Error Types:**
    *   Consult the `@google/generative-ai` SDK documentation (if available through Context7 or online) to identify specific error types or codes that the SDK might throw (e.g., authentication errors, rate limit errors, invalid input errors, content safety blocks).
2.  **Refine `catch` Block in `api-server/src/app/api/chat/route.ts`:**
    *   Modify the existing `catch` block to check for specific error instances or properties from the Gemini SDK.
    *   Provide more specific, user-friendly error messages in the `ChatResponseBody.error` field based on the type of error encountered.
    *   Map different Gemini errors to appropriate HTTP status codes if applicable (e.g., 400 for bad input, 401/403 for auth issues, 429 for rate limits, 503 for temporary service unavailability).
    *   Continue to log detailed technical errors on the server-side for debugging.
3.  **Consider Content Safety Handling:**
    *   The Gemini API might block responses due to safety settings. The SDK might provide specific ways to detect this (e.g., `response.promptFeedback?.blockReason`).
    *   Implement logic to inform the client if a response was blocked due to safety concerns.
4.  **Testing (Manual - if server issues resolved):**
    *   Attempt to run the `api-server` development server.
    *   Use a tool like Postman or curl to send various types of requests to `http://localhost:3000/api/chat` to trigger different error conditions:
        -   Request with an invalid/missing API key (if possible to simulate without server restart).
        -   Request that might trigger a rate limit (hard to simulate).
        -   Request with a prompt that might be blocked by safety filters.
    *   Verify that the API returns the new, more specific error messages and appropriate status codes.
5.  Commit the changes.
6.  **Contingency for Testing:** If server observation issues persist, document the implemented error handling thoroughly and note that live testing was hindered. Suggest user test in an external terminal.
