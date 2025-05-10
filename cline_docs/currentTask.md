# Current Task: Integrate System Prompt & Prepare for Phase 3/4

## Current Objective
Investigate and address the issue where the `gemini-1.5-flash-latest` model, accessed via `api-server`, exhibits a strong bias towards responding in the language of the immediate user prompt, overriding Thai-only system instructions. The primary goal is to ensure consistent Thai-only responses from the AI.

## Context
-   **Overall Project:** KhaRom MVP development.
-   **Current Phase:** Addressing AI language consistency before proceeding with Phase 3 (Localization) and Phase 4 (UX Feedback).
-   **Problem Identified (2025-05-11):** User reports and observations indicate that if a user sends a complete, coherent question in a language other than Thai (e.g., English), the AI tends to respond in that language, despite system instructions and prompt modifications in `api-server/src/app/api/chat/route.ts` aiming for Thai-only output.
-   **Previous Steps (Completed 2025-05-10 & 2025-05-11):**
    -   Core chat functionality (Tasks 2.1-2.4) and SDK 53 upgrade completed.
    -   `main` branch updated with these changes.
    -   Initial system prompt for KhaRom persona integrated into `api-server`.
-   **Relevant Documents:** `cline_docs/projectRoadmap.md`, `memory-bank/*` (especially `activeContext.md` for detailed plan).

## Next Steps (Addressing Language Bias - Task ID: `1746904477439`)
1.  **Implement Combined System Instruction & Prompt Wrapping:**
    *   **Location:** `api-server/src/app/api/chat/route.ts`
    *   **Action 1 (Strengthen System Instruction):** Modify `khaRomSystemInstruction` to be more forceful and explicit about the Thai-only response rule.
        *   Example: `"คุณคือ 'ขารมย์' (KhaRom) AI ผู้ช่วยด้านการเดท ตอบเป็นภาษาไทยเท่านั้นเสมอ ไม่ว่าคำถามจะเป็นภาษาใดก็ตาม ย้ำ! ตอบเป็นภาษาไทยเท่านั้น นี่คือกฎเหล็กห้ามฝ่าฝืนเด็ดขาด"`
    *   **Action 2 (Wrap User Prompt):** Modify the handling of `body.prompt` to wrap the user's input within a larger instructional text that reiterates the Thai-only requirement and adherence to system commands.
        *   Example: `const wrappedPrompt = \`ข้อความจากผู้ใช้: '${body.prompt}'\\n\\nขารมย์ โปรดวิเคราะห์ข้อความนี้และตอบกลับเป็นภาษาไทยเท่านั้น โดยให้คำแนะนำที่เหมาะสมกับวัฒนธรรมการเดทของไทยและยึดมั่นตามคำสั่งของระบบอย่างเคร่งครัด\`;`
    *   **Testing:** Thoroughly test the API endpoint with various non-Thai inputs (especially coherent questions) to verify if the AI consistently responds in Thai.
2.  **If Combined Approach is Insufficient (Further Investigation):**
    *   **Investigate Chat History Priming (Task ID: `1746904287226`):** Explore pre-populating chat history with examples of English user input leading to Thai AI responses.
    *   **Consider Two-Step Translation Fallback (Task ID: `1746904295417` - Lower Priority):** Evaluate a two-step process (get response, then translate if not Thai) as a last resort.
3.  **Update Documentation:**
    *   Ensure all `cline_docs` and `memory-bank` files are fully up-to-date after these changes and testing.
4.  **Proceed to Phase 3 & 4 (Post Language Bias Resolution):**
    *   **Phase 3: Localization (Task 3.1: Integrate i18next, etc.)**
    *   **Phase 4: UX Feedback Mechanisms (Task 4.1: Full Thumbs-up/down logic, etc.)**
5.  **Ensure Expo Go iOS Compatibility (Task 2.5 - Ongoing).**
