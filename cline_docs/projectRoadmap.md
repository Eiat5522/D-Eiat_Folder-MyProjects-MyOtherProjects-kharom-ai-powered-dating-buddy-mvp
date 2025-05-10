# Project Roadmap: KhaRom MVP

## Overall Goal
Develop a Minimum Viable Product (MVP) of the KhaRom mobile AI chat application, focusing on core functionality and full compatibility with Expo Go on iOS. The app will help users craft confident, culturally nuanced Thai chat messages for dating scenarios.

## Key Features for MVP
-   [ ] AI-Powered Chat Interface (Thai-only AI responses)
-   [ ] UI Language Toggle (Thai/English)
-   [ ] Robust UX Feedback (Error handling, retries, thumbs-up/down for AI replies)

## Completion Criteria for MVP
-   All core features are implemented and functional.
-   The application runs smoothly and reliably within the Expo Go iOS app.
-   Basic UI is intuitive and user-friendly.
-   Next.js API proxy for Gemini is deployed and operational.
-   API keys are securely managed.
-   Core documentation (Memory Bank, cline_docs) is established.

## Phases & High-Level Tasks

### Phase 0: Project Initialization & Setup
-   [x] **Task 0.1:** Initialize Memory Bank
    -   [x] Create `projectbrief.md`
    -   [x] Create `productContext.md`
    -   [x] Create `activeContext.md`
    -   [x] Create `systemPatterns.md`
    -   [x] Create `techContext.md`
    -   [x] Create `progress.md` (and update with current date)
    -   [x] Initialize Knowledge Graph with core entities and relationships.
-   [x] **Task 0.2:** Initialize `cline_docs`
    -   [x] Create `projectRoadmap.md` (This document)
    -   [x] Create `currentTask.md`
    -   [x] Create `techStack.md`
    -   [x] Create `codebaseSummary.md` (Completed 2025-05-09)
-   [x] **Task 0.3:** Setup Project Repositories & Structure (Completed 2025-05-10)
    -   [x] Initialize Git repository on GitHub. (Includes initial commit of docs & README, 2025-05-09)
    -   [x] Set up React Native (Expo Bare) project structure. (Aligned to SDK 51, 3 low vulnerabilities, runnable. 2025-05-09)
    -   [x] Set up Next.js API project structure. (Completed 2025-05-10)
    -   [x] Configure ESLint and Prettier for both projects. (Completed 2025-05-10)

### Phase 1: Backend API Proxy (Next.js)
-   [x] **Task 1.1:** Develop `/api/chat` endpoint. (Completed 2025-05-10)
-   [x] **Task 1.2:** Implement secure proxy to Google Gemini. (Completed 2025-05-10)
-   [x] **Task 1.3:** Implement error handling for Gemini calls. (Completed 2025-05-10)
-   [x] **Task 1.4:** Deploy to Vercel. (Completed 2025-05-10)

### Phase 2: Core Chat UI & Logic (React Native)
-   [x] **Task 2.1:** Implement Chat Screen UI (Message Input, List). (Completed 2025-05-10)
-   [ ] **Task 2.2:** Develop `MessageItem` component. (Note: `MessageBubble.tsx` created, which serves a similar purpose to `MessageItem`. This task might be considered partially complete or can be re-evaluated.)
-   [ ] **Task 2.3:** Integrate API service for Gemini proxy.
-   [ ] **Task 2.4:** Implement loading states and basic error display.
-   [ ] **Task 2.5:** Ensure Expo Go iOS compatibility.

### Phase 3: Localization (React Native)
-   [ ] **Task 3.1:** Integrate i18next.
-   [ ] **Task 3.2:** Create initial Thai/English translation files.
-   [ ] **Task 3.3:** Implement UI language toggle.

### Phase 4: UX Feedback Mechanisms (React Native)
-   [ ] **Task 4.1:** Add thumbs-up/down to `MessageItem`.
-   [ ] **Task 4.2:** Implement retry mechanism.
-   [ ] **Task 4.3:** Refine user-facing error messages.

### Phase 5: Testing & Refinement
-   [ ] **Task 5.1:** Comprehensive testing in Expo Go.
-   [ ] **Task 5.2:** Bug fixing and performance optimization.
-   [ ] **Task 5.3:** Code reviews.

## Completed Tasks
-   **Task 0.1:** Initialize Memory Bank (All sub-tasks completed on 2025-05-09)
-   **Task 0.2:** Initialize `cline_docs` (All sub-tasks completed on 2025-05-09)
-   **Task 0.3:** Setup Project Repositories & Structure (Completed 2025-05-10)
-   **Task 1.1:** Develop `/api/chat` endpoint. (Completed 2025-05-10)
-   **Task 1.2:** Implement secure proxy to Google Gemini. (Completed 2025-05-10)
-   **Task 1.3:** Implement error handling for Gemini calls. (Completed 2025-05-10)
-   **Task 1.4:** Deploy to Vercel. (Completed 2025-05-10)
-   **Task 2.1:** Implement Chat Screen UI (Message Input, List). (Completed 2025-05-10)

## Future Considerations (Post-MVP)
-   User accounts and message history.
-   Advanced AI context management.
-   Expanded feedback options.
-   Analytics.
-   EAS Build for broader distribution.
