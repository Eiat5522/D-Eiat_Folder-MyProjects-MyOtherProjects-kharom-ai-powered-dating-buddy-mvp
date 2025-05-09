# Active Context

## Current Work Focus
- Initializing the project's memory bank.
- Establishing the foundational documentation for KhaRom MVP.

## Recent Changes
- Created `memory-bank/projectbrief.md` with the initial project overview.
- Created `memory-bank/productContext.md` detailing the product's purpose, problems solved, and UX goals.

## Next Steps
1. Create `memory-bank/systemPatterns.md`.
2. Create `memory-bank/techContext.md`.
3. Create `memory-bank/progress.md`.
4. Initialize the knowledge graph with core project entities and relationships.
5. Begin scaffolding the React Native (Expo Bare) application structure.
6. Set up the Next.js API proxy for Google Gemini.

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

## Learnings & Project Insights (To Be Developed)
- *This section will capture insights gained during the development process.*
- Initial thoughts:
    - The primary challenge will be ensuring a seamless and fast AI response cycle within Expo Go.
    - Localization with i18next will require careful planning for UI elements and system messages.
