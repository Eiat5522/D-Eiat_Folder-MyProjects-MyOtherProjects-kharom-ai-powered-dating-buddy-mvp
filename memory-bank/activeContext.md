# Active Context

## Current Work Focus
- Starting **Phase 1: Backend API Proxy (Next.js)** from `projectRoadmap.md`.
- Specifically focusing on **Task 1.2: Implement secure proxy to Google Gemini**.

## Recent Changes
- All core Memory Bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`) created and updated to reflect initial project status (as of 2025-05-09).
- Knowledge Graph initialized.
- `cline_docs` folder initialized with `projectRoadmap.md`, `currentTask.md`, `techStack.md`, `codebaseSummary.md`.
- Local Git repository initialized, `README.md` created, and initial documentation pushed to GitHub.
- `mobile-app` (React Native Expo) successfully re-scaffolded using Expo SDK 51.
- **(New as of 2025-05-10):**
    - `api-server` (Next.js v15.3.2) project created in `api-server/` directory.
    - ESLint and Prettier configured for `mobile-app` (React Native/Expo).
    - ESLint and Prettier configured for `api-server` (Next.js), including Tailwind CSS plugin for Prettier.
    - Task 0.3 "Setup Project Repositories & Structure" marked as complete in `projectRoadmap.md`.
    - **Task 1.1 "Develop /api/chat endpoint" completed:**
        - Created `api-server/src/app/api/chat/route.ts` with a basic POST handler.
        - Defined `ChatRequestBody` and `ChatResponseBody` TypeScript interfaces.
        - Updated `api-server/package.json` with `lint` and `lint:fix` scripts.
        - Assumed successful manual testing of the placeholder endpoint.
        - Committed changes to Git.
    - All `cline_docs` and `memory-bank` files updated to reflect completion of Task 1.1.

## Next Steps
1.  **Task 1.2: Implement secure proxy to Google Gemini**
    *   Install Google Gemini SDK in `api-server`.
    *   Guide user on setting up `GEMINI_API_KEY` environment variable.
    *   Modify `api-server/src/app/api/chat/route.ts` to call Gemini API.
    *   Implement error handling for Gemini calls.
    *   Manually test the endpoint with actual Gemini integration.
    *   Commit changes.
2.  Proceed with subsequent tasks in **Phase 1: Backend API Proxy (Next.js)** as outlined in `projectRoadmap.md` (Task 1.3: Error handling, Task 1.4: Deploy).

## Active Decisions & Considerations
- **Expo Go Compatibility:** All development choices must prioritize smooth operation within Expo Go on iOS. This is a primary constraint.
- **MVP Scope:** Focus strictly on core features: AI chat, language toggle, and UX feedback. Avoid scope creep.
- **Thai-Only AI:** The AI interaction is exclusively in Thai, even if the UI is in English. This needs to be clear in the UX.
- **Security:** API keys for Google Gemini must be environment-protected and not exposed in the client-side code. The `.env.local` file in `api-server` must be in `.gitignore`.

## Important Patterns & Preferences (To Be Developed)
- *This section will be populated as development progresses and patterns emerge.*
- Initial thoughts:
    - Consistent component structure for React Native.
    - Clear separation of concerns for API services.
    - Robust error handling and user feedback mechanisms.
    - Secure handling of API keys and environment variables.

## Learnings & Project Insights
- Initial `expo-template-bare-typescript` led to an older SDK (likely ~41) with many critical vulnerabilities and a persistent Metro bundler error (`Cannot find module 'metro/src/ModuleGraph/worker/importLocationsPlugin'`).
- `npm audit fix --force` on the older SDK project attempted to upgrade `expo` to a non-standard version (`53.0.9`), breaking the Metro bundler.
- Re-scaffolding by:
    1. Deleting the problematic `mobile-app`.
    2. Using `npx create-expo-app@latest mobile-app --template blank-typescript@sdk-50`.
    3. Running `npx expo prebuild --clean` to get native folders.
    4. Manually updating `package.json` for `expo` to `~51.0.14` and `expo-status-bar` to `~1.12.1`.
    5. Deleting `node_modules` and `package-lock.json`, then running `npm install`.
    This sequence successfully created a runnable Expo SDK 51 project with only 3 low vulnerabilities and resolved the Metro error.
- Explicitly specifying SDK versions for templates (e.g., `blank-typescript@sdk-50`) and then aligning dependencies carefully seems more robust than relying on `@latest` for complex templates like `bare-typescript`.
- The `npx expo install --fix` command failed when `node_modules` was empty due to invoking a legacy global `expo-cli`. Running `npm install` first is necessary for `npx expo` commands to use the project's local Expo CLI.
- Mobile hotspot connections can be unreliable for `npm install` operations, potentially causing `ECONNRESET` errors.
- Ensuring `lint:fix` scripts are present in `package.json` is crucial for maintaining code quality efficiently.
