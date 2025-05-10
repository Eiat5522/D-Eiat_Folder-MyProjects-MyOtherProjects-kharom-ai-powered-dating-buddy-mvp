# Active Context

## Current Work Focus
-   **Addressing Gemini Language Bias:** The primary focus remains on resolving the issue where the `gemini-1.5-flash-latest` model responds in the user's input language instead of consistently in Thai.
    -   **Attempted Strategies (2025-05-11):**
        -   Combined strengthened `systemInstruction` and prompt wrapping (Task ID: `1746904477439`).
        -   Added chat history priming to the above.
    -   **Result:** These strategies were **not sufficient**; the model still replied in English to English prompts.
-   **Implemented Strategy (2025-05-11):** Implemented a two-step translation fallback mechanism (Task ID: `1746904295417`) in `api-server/src/app/api/chat/route.ts`. This involves detecting non-Thai responses and making a second Gemini call for translation.
-   **Mobile App (`mobile-app`):** Expo SDK 53. Core chat functionality (Tasks 2.1-2.4) is implemented.
-   **Git:** `main` branch will be updated with the translation fallback logic.

## Recent Changes
-   **(2025-05-11 - Implemented Two-Step Translation Fallback):**
    -   Modified `api-server/src/app/api/chat/route.ts` to include:
        -   A new system instruction for translation.
        -   Logic to get the initial AI response.
        -   A heuristic (character-based) to detect if the response is likely not in Thai.
        -   If not Thai, a second call to the Gemini model to translate the AI's previous (non-Thai) response into Thai.
        -   Error handling for the translation step.
    -   This addresses Task ID: `1746904295417`.
-   **(2025-05-11 - Language Bias Mitigation Attempts - Failed):**
    -   Implemented and tested chat history priming in `api-server/src/app/api/chat/route.ts`, in addition to strengthened system instructions and prompt wrapping.
    -   Tested against Vercel deployment; AI still responded in English to English prompts.
-   **(2025-05-11 - Previous - Planning for Language Bias):**
    -   Investigated the Gemini language bias issue.
    -   Formulated initial plans (strengthening system instructions, prompt wrapping).
-   **(2025-05-11 - System Prompt & Git - Earlier):**
    -   Integrated initial system prompt for KhaRom AI persona.
-   **(2025-05-10 - Core Chat Functionality Implementation - Tasks 2.1, 2.2, 2.3, 2.4):**
    -   Core chat UI and API integration completed.
-   **(2025-05-10 - Dependency Management & SDK 53 Upgrade):**
    -   `mobile-app` upgraded to Expo SDK 53.
-   **(Previously on 2025-05-10 - Phase 1 Completion):**
    -   Backend API Proxy (Next.js) completed and deployed.

## Next Steps (Immediate & Upcoming)
1.  **Test Two-Step Translation Fallback (Task ID: `1746904295417`):**
    *   Thoroughly test the implemented fallback mechanism in `api-server/src/app/api/chat/route.ts` with various non-Thai inputs.
    *   Deploy to Vercel for comprehensive testing.
    *   Assess effectiveness, latency, and potential cost implications in practice.
2.  **Update Documentation (Ongoing):**
    *   Reflect the implementation details and testing outcomes of the fallback mechanism in all relevant `cline_docs` and `memory-bank` files.
    *   Commit and push all code and documentation updates to GitHub.
3.  **Proceed with Phase 3: Localization (Task 3.1: Integrate i18next) once language bias is acceptably managed through the fallback.**
4.  **Proceed with Phase 4: UX Feedback Mechanisms (Task 4.1, 4.2, 4.3) once language bias is acceptably managed.**
5.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**

## Active Decisions & Considerations
-   **Language Consistency:** Remains the top priority. The current direct prompting methods have proven insufficient.
-   **Two-Step Translation Trade-offs:** Balance the need for Thai-only output against potential increased latency and cost.
-   **Expo Go Compatibility (SDK 53):** Remains critical.
-   **MVP Scope:** Maintain focus on core features.

## Important Patterns & Preferences
-   Iterative development and testing.
-   Persistence in problem-solving, exploring alternative solutions when initial approaches fail.
-   Secure API key management.

## Learnings & Project Insights
    -   The `gemini-1.5-flash-latest` model is highly persistent in matching the input prompt's language, overriding direct system instructions.
    -   Direct prompting methods (strengthened system instruction, prompt wrapping, history priming) were insufficient to enforce Thai-only responses.
    -   A two-step translation fallback has been implemented as a more robust solution, though it may introduce minor latency and additional API cost.
    -   Continuous documentation is vital for tracking evolving issues, attempted solutions, and plans.
