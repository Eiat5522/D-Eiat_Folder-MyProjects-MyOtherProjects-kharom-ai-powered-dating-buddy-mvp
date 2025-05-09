# KhaRom AI-Powered Dating Buddy MVP 🇹🇭❤️

KhaRom is a mobile AI chat application designed to help users craft confident, culturally nuanced Thai chat messages for dating scenarios. Users type their message prompts and receive instant AI-generated replies in Thai.

**This project is currently in the MVP development phase.**

## ✨ Core Features (MVP)
-   **🤖 AI-Powered Chat Interface:** Get AI-generated responses in Thai.
-   **🌐 UI Language Toggle:** Switch the app's interface between Thai and English. (AI responses remain Thai-only).
-   **👍👎 Robust UX Feedback:** Graceful error handling, message retry options, and thumbs-up/down feedback for AI replies.

## 🎯 Target Users
Thai-speaking singles (18–35) looking for assistance in:
-   Breaking the ice.
-   Improving dating conversations.
-   Practicing Thai chat in a fun, guided way.

## 🛠️ Tech Stack

### Mobile Application (Frontend)
-   **Framework:** React Native (Expo Bare Workflow)
-   **Language:** TypeScript
-   **Styling:** React Native `StyleSheet` API
-   **Localization:** i18next

### Backend API (Proxy)
-   **Framework:** Next.js (v14+ with App Router)
-   **Language:** TypeScript
-   **Deployment:** Vercel / Railway

### AI Service
-   **Provider:** Google Gemini

## 🚀 Getting Started (Planned - Post Setup)

*(Instructions on how to run the React Native app and potentially the Next.js backend locally will be added here once the project structures are set up.)*

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/kharom-ai-powered-dating-buddy-mvp.git
    cd kharom-ai-powered-dating-buddy-mvp
    ```
2.  **Setup Frontend (React Native - Expo):**
    ```bash
    # Navigate to frontend directory (once created)
    # yarn install
    # expo start
    ```
3.  **Setup Backend (Next.js API):**
    ```bash
    # Navigate to backend directory (once created)
    # yarn install
    # yarn dev
    ```

## 📁 Project Structure (Planned)
```
/src
  /app              # Next.js API Routes (e.g., /api/chat)
  /components       # Reusable React Native components
  /screens          # Mobile app screens
  /navigation       # React Navigation configuration
  /hooks            # Custom React hooks
  /services         # API services (Gemini proxy calls)
  /constants        # App-wide constants
  /locales          # i18next translation files (Thai/EN)
/assets             # Static assets (images, fonts)
.clinerules         # Cline configuration folder
/cline_docs         # Cline project context
/memory-bank        # Cline Memory Bank folder
README.md           # This file
```

## 📝 Development Priority: Expo Go iOS App Compatibility
The MVP must be fully functional and previewable through the Expo Go iOS App. Development focus prioritizes features that work seamlessly within Expo Go's constraints.

## 🤝 Contributing
This project is currently in early MVP development. Contribution guidelines will be established later.

## 📄 License
*(License information to be added if applicable)*
