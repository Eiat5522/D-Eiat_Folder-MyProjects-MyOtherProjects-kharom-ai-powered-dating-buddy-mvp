# Active Context

## Current Work Focus
- Completing **Task 0.3: Setup Project Repositories & Structure** from `projectRoadmap.md`.
- The React Native `mobile-app` (Expo SDK 51) is now set up and runnable.
- Next is to commit `mobile-app`, then set up the Next.js API project.

## Recent Changes
- All core Memory Bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`) created and updated to reflect current project status.
- Knowledge Graph initialized.
- `cline_docs` folder initialized with `projectRoadmap.md`, `currentTask.md`, `techStack.md`, `codebaseSummary.md`.
- Local Git repository initialized, `README.md` created, and initial documentation pushed to GitHub.
- `mobile-app` (React Native Expo) successfully re-scaffolded using Expo SDK 51 (`blank-typescript@sdk-50` template + `expo prebuild`).
    - Metro bundler error resolved.
    - Project is runnable (`npm start` works).
    - Vulnerabilities reduced to 3 low severity after aligning dependencies to SDK 51.

## Next Steps
1.  User to commit the current stable state of `mobile-app` to GitHub.
2.  Set up the Next.js API project structure (e.g., in an `api-server` subdirectory).
3.  Configure ESLint and Prettier for both `mobile-app` and the Next.js project.
4.  Mark Task 0.3 in `projectRoadmap.md` as complete.
5.  Proceed to **Phase 1: Backend API Proxy (Next.js)**.

## Active Decisions & Considerations
- **Expo Go Compatibility:** All development choices must prioritize smooth operation within Expo Go on iOS. This is a primary constraint.
- **MVP Scope:** Focus strictly on core features: AI chat, language toggle, and UX feedback. Avoid scope creep.
- **Thai-Only AI:** The AI interaction is exclusively in Thai, even if the UI is in English. This needs to be clear in the UX.
- **Security:** API keys for Google Gemini must be environment-protected and not exposed in the client-side code.

## Important Patterns & Preferences (To Be Developed)
- *This section will be populated as development progresses and patterns emerge.*
- Initial thoughts:
    - Consistent component structure for React Native.
    - Clear separation of concerns for API services.
    - Robust error handling and user feedback mechanisms.

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
