# Active Context

## Current Work Focus
- Completing **Phase 1: Backend API Proxy (Next.js)** from `projectRoadmap.md`.
- Finishing **Task 1.4: Deploy to Vercel** with deployment instructions created.

## Recent Changes
- All core Memory Bank files created and maintained up-to-date.
- Knowledge Graph initialized and `cline_docs` folder properly maintained.
- Local Git repository active with regular commits.
- `mobile-app` (React Native Expo) stable with SDK 51.
- **(Latest Changes as of 2025-05-10):**
    - **Task 1.3 "Implement error handling for Gemini calls" completed:**
        - Added comprehensive error handling in `api-server/src/app/api/chat/route.ts`
        - Implemented specific error type checking with appropriate HTTP status codes
        - Added content safety block detection and handling
        - Enhanced error logging for debugging
        - Types of errors handled:
            - Authentication/Permission (401)
            - Rate Limiting (429)
            - Invalid Arguments (400)
            - Service Unavailability (503)
            - Internal Errors (500)
            - Content Safety Blocks (400)
    - **Task 1.4 "Deploy to Vercel" in progress:**
        - Created `userInstructions/04_deploy_to_vercel.md` with complete deployment guide
        - Verified `.gitignore` configuration for environment files
        - Prepared deployment plan with emphasis on environment variable security
        - Selected Vercel as the deployment platform
    - Previous tasks (1.3 and earlier) remain stable.

## Next Steps
1.  **Complete Task 1.4: Deploy to Vercel**
    * Follow the deployment guide in `userInstructions/04_deploy_to_vercel.md`
    * Configure environment variables in Vercel
    * Deploy the API server
    * Test the deployed endpoint
    * Document the production URL
2.  Proceed to **Phase 2: Core Chat UI & Logic** after successful deployment

## Active Decisions & Considerations
- **Expo Go Compatibility:** All development choices must prioritize smooth operation within Expo Go on iOS. This is a primary constraint.
- **MVP Scope:** Focus strictly on core features: AI chat, language toggle, and UX feedback. Avoid scope creep.
- **Thai-Only AI:** The AI interaction is exclusively in Thai, even if the UI is in English. This needs to be clear in the UX.
- **Security:** API keys for Google Gemini must be environment-protected and not exposed in the client-side code. Using Vercel's environment variable system for production.
- **Error Handling:** Using structured error responses with specific status codes and user-friendly messages while maintaining detailed server-side logging.
- **Deployment Strategy:** Using Vercel for:
    - Automatic deployments from Git
    - Secure environment variable management
    - Edge network deployment
    - Built-in monitoring and logging

## Important Patterns & Preferences
- **API Error Handling Pattern:** 
    - Check for specific error types using type guards
    - Map error codes to appropriate HTTP status codes
    - Provide user-friendly messages
    - Log detailed error information server-side
    - Handle content safety blocks distinctly from other errors
- **Response Structure:**
    - Success: `{ reply: string, error: null }`
    - Error: `{ reply: null, error: string, blocked?: boolean, blockReason?: string }`
- **Deployment Pattern:**
    - Environment variables stored securely in Vercel
    - Automatic deployments on Git push
    - Production builds optimized by Vercel
    - Edge network distribution

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
