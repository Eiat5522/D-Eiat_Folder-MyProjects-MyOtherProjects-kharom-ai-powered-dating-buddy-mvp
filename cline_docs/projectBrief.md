# Project Brief

## Overview
Building a MVP version of the mobile AI chat application called **KhaRom** that helps users craft confident, culturally nuanced Thai chat messages for dating scenarios. Users type their own message prompts and receive instant AI-generated replies in Thai.

## Development Priority: Expo Go iOS App Compatibility
- The MVP must be fully functional and previewable through the Expo Go iOS App
- Development focus should prioritize features that work within Expo Go's constraints
- All implementations must be tested directly in the Expo Go environment
- Core functionality (chat interface, language toggle, UX feedback) must perform smoothly in Expo Go
- Any features that could potentially conflict with Expo Go compatibility should be flagged and reviewed
- Regular testing in Expo Go should be part of the development workflow

## Core Features
- **AI-Powered Chat Interface**  
  Users send messages and receive AI-generated responses in Thai only, with a loading indicator while the AI processes.
- **Language Toggle**  
  The UI itself can switch between Thai and English at any time, without affecting the AI’s Thai-only replies.
- **Robust UX Feedback**  
  Chat bubbles display send errors gracefully, allow retries, and include simple thumbs-up/thumbs-down feedback on AI replies.

## Target Users
Thai-speaking singles (18–35) looking for help breaking the ice, improving dating conversations, or practicing Thai chat in a fun, guided way.

## Technical Preferences (optional)
- **Frontend:** React Native (Expo Bare workflow) with TypeScript  
- **Localization:** i18next for Thai/English toggling  
- **Backend:** Next.js API route proxy to Google Gemini (Thai-only)  
- **Constraints:** No Firebase/Supabase; environment-protected API keys; EAS Build for deployment  
```
