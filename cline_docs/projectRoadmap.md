# Project Roadmap: KhaRom MVP

## Overall Goal
Develop a Minimum Viable Product (MVP) of the KhaRom mobile AI chat application, focusing on core functionality and full compatibility with Expo Go on iOS. The app will help users craft confident, culturally nuanced Thai chat messages for dating scenarios.

## Key Features for MVP
-   [x] AI-Powered Chat Interface (Thai-only AI responses, core logic complete)
-   [x] UI Language Toggle (Thai/English) (Completed 2025-05-11)
-   [x] Robust UX Feedback (Error handling, retries, thumbs-up/down for AI replies) (Completed 2025-05-11)
-   [x] Session-Based Chat History (View, Create, Load, Rename, Delete sessions) (Completed 2025-05-11)

## Completion Criteria for MVP
-   All core features (including Chat History) are implemented and functional.
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

### Phase 2: Core Chat UI & Logic (React Native - SDK 53)
-   [x] **Task 2.1:** Implement Chat Screen UI (Message Input, List) & Upgrade to SDK 53. (Completed 2025-05-10)
    -   [x] Created `ChatScreen.tsx`, `MessageList.tsx`, `MessageBubble.tsx`, `MessageInput.tsx`.
    -   [x] Integrated components and updated `App.tsx`.
    -   [x] Successfully upgraded `mobile-app` to Expo SDK 53 and confirmed preview in Expo Go.
-   [x] **Task 2.1.1 (Sub-task):** Incrementally re-add necessary UI/UX dependencies:
    -   [x] `react-native-safe-area-context` (Integrated 2025-05-10)
    -   [x] `react-native-gesture-handler` (Installed 2025-05-11 for Drawer)
    -   [x] `react-native-reanimated` (Installed 2025-05-11 for Drawer)
-   [x] **Task 2.2:** Develop/Refine `MessageItem`/`MessageBubble.tsx` component (Feedback icons added 2025-05-10, detailed feedback UI with bottom sheet 2025-05-11).
-   [x] **Task 2.3:** Integrate API service for OpenRouter proxy (Updated from Gemini 2025-05-11).
-   [x] **Task 2.4:** Implement loading states and basic error display (Basic implementation 2025-05-10).
-   [ ] **Task 2.5:** Ensure Expo Go iOS compatibility (Ongoing).

### Phase 3: Localization (React Native)
-   [x] **Task 3.1:** Integrate i18next. (Completed 2025-05-11)
-   [x] **Task 3.2:** Create initial Thai/English translation files. (Completed 2025-05-11, updated 2025-05-11 for feedback UI)
-   [x] **Task 3.3:** Implement UI language toggle. (Completed 2025-05-11, basic toggle in ChatScreen, moved to Drawer 2025-05-11)
-   [x] **Task 3.4 (New):** Implement Hamburger Menu for Navigation and Language Toggle. (Completed 2025-05-11)

### Phase 4: UX Feedback Mechanisms (React Native)
-   [x] **Task 4.1:** Add thumbs-up/down logic to `MessageBubble.tsx` (Detailed feedback UI with BottomSheet). (Completed 2025-05-11)
-   [x] **Task 4.2:** Implement retry mechanism. (Completed 2025-05-11)
-   [x] **Task 4.3:** Refine user-facing error messages (Localized). (Completed 2025-05-11)

### Phase 5: Testing & Refinement (Expanded)
-   [ ] **Task 5.1:** Comprehensive testing of all features (including Chat History) in Expo Go.
-   [ ] **Task 5.2:** Bug fixing and performance optimization based on testing.
-   [ ] **Task 5.3:** Code reviews for all implemented features.
-   [ ] **Task 5.4 (was 2.5):** Ensure overall Expo Go iOS compatibility (Ongoing).


### Phase C: Session-Based Chat History (Completed 2025-05-11)
-   [x] **Task C.1:** Data Structure & Storage (AsyncStorage)
    -   [x] Task C.1.1: Define Session Data Structures
    -   [x] Task C.1.2: Implement AsyncStorage Utilities (`SessionStorageService.ts`)
-   [x] **Task C.2:** Session Management Logic (Context API)
    -   [x] Task C.2.1: Create `SessionContext.tsx`
    -   [x] Task C.2.2: Implement Context Provider Functions
    -   [x] Task C.2.3: Integrate `SessionProvider` in `App.tsx`
-   [x] **Task C.3:** UI - Chat History Screen (`ChatHistoryScreen.tsx`)
    -   [x] Task C.3.1: Create Basic Screen Structure & Item Press Action
    -   [x] Task C.3.3: Implement Swipe-to-Reveal Actions
    -   [x] Task C.3.4: Implement Rename Functionality
    -   [x] Task C.3.5: Implement Delete Functionality (with confirmation)
    -   [x] Task C.3.6: Implement "New Chat" Button (FAB)
    -   [x] Task C.3.7: Handle Empty State
-   [x] **Task C.4:** UI - Drawer Integration (`AppNavigator.tsx`)
    -   [x] Task C.4.1: Add "Chat History" screen to Drawer Navigator
    -   [x] Task C.4.2: Add "New Chat" item to Drawer Menu
-   [x] **Task C.5:** `ChatScreen.tsx` Modifications
    -   [x] Task C.5.1: Integrate with `SessionContext` (display messages, save new messages, handle feedback)
    -   [x] Task C.5.2: Handle No Active Session / Initial Load (auto-create new session)
-   [x] **Task C.6:** Localization
    -   [x] Task C.6.1: Add New Translation Keys (`en.json`, `th.json`)
-   [ ] **Task C.7:** Testing & Refinement (Now part of expanded Phase 5)


## Completed Tasks
-   **Task 0.1:** Initialize Memory Bank (All sub-tasks completed on 2025-05-09)
-   **Task 0.2:** Initialize `cline_docs` (All sub-tasks completed on 2025-05-09)
-   **Task 0.3:** Setup Project Repositories & Structure (Completed 2025-05-10)
-   **Task 1.1:** Develop `/api/chat` endpoint. (Completed 2025-05-10)
-   **Task 1.2:** Implement secure proxy to Google Gemini. (Completed 2025-05-10)
-   **Task 1.3:** Implement error handling for Gemini calls. (Completed 2025-05-10)
-   **Task 1.4:** Deploy to Vercel. (Completed 2025-05-10)
-   **Task 2.1:** Implement Chat Screen UI (Message Input, List). (Completed 2025-05-10)
-   **Task 2.1.1:** `react-native-safe-area-context` integration. (Completed 2025-05-10)
-   **Task 2.2:** Refine `MessageBubble.tsx` (Feedback icons). (Completed 2025-05-10)
-   **Task 2.3:** Integrate API service. (Completed 2025-05-10)
-   **Task 2.4:** Basic loading/error states. (Completed 2025-05-10)
-   **Task 3.1:** Integrate i18next. (Completed 2025-05-11)
-   **Task 3.2:** Create initial Thai/English translation files. (Completed 2025-05-11, updated 2025-05-11)
-   **Task 3.3:** Implement UI language toggle. (Completed 2025-05-11, moved to Drawer 2025-05-11)
-   **Task 3.4 (New):** Implement Hamburger Menu. (Completed 2025-05-11)
-   **Task 4.1:** Add thumbs-up/down logic. (Completed 2025-05-11)
-   **Task 4.2:** Implement retry mechanism. (Completed 2025-05-11)
-   **Task 4.3:** Refine user-facing error messages. (Completed 2025-05-11)

## Future Considerations (Post-MVP)
-   User accounts. (Message history is now MVP)
-   Advanced AI context management (e.g., using history for better AI responses).
-   Refined session title generation (e.g., from first message content).
-   Expanded feedback options & backend storage for feedback.
-   Analytics.
-   EAS Build for broader distribution.
