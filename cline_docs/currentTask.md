# Current Task: Implement secure proxy to Google Gemini (Phase 1 - Task 1.2)

## Current Objective
Start **Task 1.2** from `projectRoadmap.md`: Implement secure proxy to Google Gemini.
This is the second task in **Phase 1: Backend API Proxy (Next.js)**.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Phase 1: Backend API Proxy (Next.js).
-   **Previous Step (Task 1.1 - Completed 2025-05-10):**
    -   Developed the basic `/api/chat` endpoint in `api-server/src/app/api/chat/route.ts`.
    -   Implemented a placeholder POST handler with basic request/response TypeScript types.
    -   Manually tested the endpoint.
    -   Committed the initial API route structure.
    -   Updated `api-server/package.json` with `lint:fix` script.
-   **Relevant Document:** `cline_docs/projectRoadmap.md` (Task 1.2).

## Next Steps for Task 1.2
1.  **Install Google Gemini SDK:**
    *   Add the official Google AI SDK for Node.js (e.g., `@google/generative-ai`) to the `api-server` project.
2.  **Environment Variable Setup (Guidance):**
    *   Provide instructions for the user to set up the `GEMINI_API_KEY` environment variable locally (e.g., in a `.env.local` file for the `api-server`). Emphasize that this file should be in `.gitignore`.
3.  **Modify API Handler (`route.ts`):**
    *   Update the `POST` handler in `api-server/src/app/api/chat/route.ts`.
    *   Initialize the Gemini client using the API key from the environment variable.
    *   Take the `prompt` from the request body.
    *   Send the prompt to the Gemini API (ensure it's configured for Thai responses if possible at this stage, or note this for future refinement).
    *   Return the actual Gemini response (or an error) in the `ChatResponseBody` structure.
4.  **Error Handling:**
    *   Implement more specific error handling for Gemini API calls (e.g., API errors, rate limits, invalid requests).
5.  **Testing (Manual):**
    *   Run the `api-server` development server with the environment variable set.
    *   Use a tool like Postman or curl to send a POST request to `http://localhost:3000/api/chat`.
    *   Verify that a real AI response is received from Gemini.
6.  Commit the changes.
