# Active Context

## Current Work Focus
- Starting **Phase 2: Core Chat UI & Logic (React Native)** from `projectRoadmap.md`.
- Task 2.1 (Implement Chat Screen UI) is complete.
- Preparing for Task 2.2 (Develop `MessageItem`/Refine `MessageBubble`) and Task 2.3 (Integrate API service).

## Recent Changes
- **(Latest Changes as of 2025-05-10 - Phase 2 Started):**
    - **Task 2.1 "Implement Chat Screen UI (Message Input, List)" completed:**
        - Created `mobile-app/src/components/ChatScreen.tsx` as the main screen container.
        - Created `mobile-app/src/components/MessageList.tsx` to display a list of messages.
        - Created `mobile-app/src/components/MessageBubble.tsx` for individual message styling.
        - Created `mobile-app/src/components/MessageInput.tsx` for user text input and send button.
        - Integrated these components:
            - `ChatScreen` now renders `MessageList` and `MessageInput`.
            - `MessageList` now renders `MessageBubble` for each message (using mock data currently).
        - Updated `mobile-app/App.tsx` to render `ChatScreen` as the main application view.
        - Started the Expo development server for `mobile-app` to allow UI preview in Expo Go.
    - **Phase 1 "Backend API Proxy (Next.js)" fully completed:**
        - Task 1.3 (Error Handling) and Task 1.4 (Vercel Deployment) were successfully completed.
        - Production API endpoint: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`
- All core Memory Bank and `cline_docs` files are up-to-date with Phase 1 completion.
- Local Git repository is current.
- `mobile-app` (React Native Expo SDK 51) and `api-server` (Next.js v15.3.2) projects are stable.

## Next Steps
1.  **Verify Expo Go UI (User Action):**
    *   User to confirm they can view the basic chat UI in Expo Go on their iOS device.
    *   Address any immediate rendering issues if reported by the user.
2.  **Refine `MessageBubble.tsx` (Task 2.2):**
    *   Review `MessageBubble.tsx` against any specific requirements for `MessageItem` from the roadmap.
    *   Make necessary adjustments or confirm completion of Task 2.2.
3.  **Integrate API Service (Task 2.3):**
    *   Create an API service module in `mobile-app/src/services/`.
    *   Implement a function within the service to call the deployed Next.js API proxy.
    *   Integrate this service into `MessageInput.tsx` to handle sending user messages.
    *   Modify `MessageList.tsx` and `ChatScreen.tsx` (or introduce state management) to handle dynamic message data from API responses, replacing mock data.
4.  **Implement Loading States & Basic Error Display (Task 2.4):**
    *   Add loading indicators in `MessageInput.tsx` or `ChatScreen.tsx` while waiting for API responses.
    *   Display basic error messages in the UI if API calls fail.
5.  **Ensure Expo Go iOS Compatibility (Task 2.5):**
    *   Continuously test all new features and changes in Expo Go on an iOS device.

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
- **Expo Go Preview with iPhone Hotspot:** Using the same iPhone to provide a hotspot to the development PC and simultaneously previewing the app via Expo Go on that iPhone can lead to connectivity issues. The iPhone may struggle to connect back to the Expo development server running on the PC over its own hotspot.
    - **Potential Solutions:**
        1.  Connect both PC and iPhone to the same external Wi-Fi network.
        2.  If hotspot must be used, troubleshoot firewall settings on the PC and try using explicit IP addresses for the Expo server.
