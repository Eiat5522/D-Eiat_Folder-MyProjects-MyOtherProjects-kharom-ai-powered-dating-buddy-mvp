# Current Task: Integrate System Prompt & Prepare for Phase 3/4

## Current Objective
Address the persistent issue where the `gemini-1.5-flash-latest` model (via `api-server`) responds in the user's input language despite multiple prompting strategies. The immediate goal is to evaluate and potentially implement a two-step translation fallback mechanism.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Focused on resolving AI language consistency.
-   **Problem Status (2025-05-11):** Attempts to enforce Thai-only AI responses using strengthened system instructions, prompt wrapping, and chat history priming have **failed**. The AI continues to respond in English to coherent English prompts.
-   **Previous Steps (Completed 2025-05-11):**
    -   Implemented and tested combined strategies (strengthened system instruction, prompt wrapping, chat history priming) in `api-server/src/app/api/chat/route.ts`.
    -   These changes were deployed to Vercel and tested, confirming the issue persists.
-   **Relevant Documents:** `cline_docs/projectRoadmap.md`, `memory-bank/*`.

## Next Steps (Addressing Language Bias)
1.  **Implement Two-Step Translation Fallback (Task ID: `1746904295417`):** (Implemented 2025-05-11)
    *   **Location:** `api-server/src/app/api/chat/route.ts`.
    *   **Action:**
        *   Assessed complexity: Moderate. Latency: Potential increase due to a second API call. API Cost: Potential increase. Deemed acceptable for MVP given the critical nature of Thai-only responses.
        *   Implemented logic to get the initial AI response.
        *   Added a heuristic (character-based) to detect if the response is likely not in Thai.
        *   If not Thai, make a second call to the Gemini model with a specific translation system instruction to translate the AI's own previous (non-Thai) response into Thai.
    *   **Next:** Thoroughly test this fallback mechanism with various non-Thai inputs. Deploy to Vercel for testing.
2.  **Update Documentation (Ongoing):**
    *   Document the outcome of the previous attempts and the implementation details of the fallback mechanism in all relevant `cline_docs` and `memory-bank` files.
    *   Commit and push all documentation updates to GitHub.
3.  **Proceed to Phase 3 & 4 (Post Successful Testing of Language Bias Resolution):**
    *   **Phase 3: Localization (Task 3.1: Integrate i18next, etc.)**
    *   **Phase 4: UX Feedback Mechanisms (Task 4.1: Full Thumbs-up/down logic, etc.)**
    *   This will proceed once the language bias is acceptably managed, even if via a fallback.
4.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**
