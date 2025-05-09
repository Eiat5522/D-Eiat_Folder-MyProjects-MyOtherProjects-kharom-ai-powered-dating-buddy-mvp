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

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Git

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/kharom-ai-powered-dating-buddy-mvp.git
    cd kharom-ai-powered-dating-buddy-mvp
    ```
    *(Replace `YOUR_USERNAME` with the actual GitHub username/organization if known, otherwise leave as is for the user to fill)*

2.  **Setup Backend (Next.js API - `api-server/`):**
    ```bash
    cd api-server
    npm install 
    # or yarn install
    ```
    - Create a `.env.local` file in the `api-server/` directory.
    - Add your Google Gemini API key to this file:
      ```env
      GEMINI_API_KEY=YOUR_GEMINI_API_KEY
      ```
    - To run the backend development server:
      ```bash
      npm run dev
      # or yarn dev
      ```
    The API will be available at `http://localhost:3000`. The chat endpoint is `http://localhost:3000/api/chat`.
    The deployed production API is at: `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`

3.  **Setup Frontend (React Native - Expo - `mobile-app/`):**
    ```bash
    cd ../mobile-app 
    # (ensure you are in the mobile-app directory)
    npm install
    # or yarn install
    ```
    - To run the frontend development server:
      ```bash
      npm start
      # or yarn start
      # or expo start
      ```
    - Follow the instructions in the terminal to open the app in Expo Go on your iOS device (ensure your device and PC are on the same Wi-Fi network for best results).

## 📊 Project Status
- **Phase 0: Project Initialization & Setup:** ✅ Completed
- **Phase 1: Backend API Proxy (Next.js):** ✅ Completed
- **Phase 2: Core Chat UI & Logic (React Native):** ⏳ In Progress (Task 2.1 Completed)
- **Phase 3: Localization (React Native):** 📋 Planned
- **Phase 4: UX Feedback Mechanisms (React Native):** 📋 Planned
- **Phase 5: Testing & Refinement:** 📋 Planned

## 📁 Project Structure
```
/kharom-ai-powered-dating-buddy-mvp/
  ├── README.md                     # This file
  ├── api-server/                   # Next.js API Proxy
  │   ├── README.md                 # API Server specific README
  │   ├── package.json
  │   ├── next.config.ts
  │   ├── .env.local.example        # Example for environment variables
  │   └── src/
  │       └── app/
  │           └── api/
  │               └── chat/
  │                   └── route.ts  # Gemini API proxy endpoint
  ├── mobile-app/                   # React Native (Expo) Mobile Application
  │   ├── README.md                 # Mobile App specific README (to be created)
  │   ├── package.json
  │   ├── app.json                  # Expo configuration
  │   ├── App.tsx                   # Main app component
  │   └── src/
  │       ├── components/
  │       ├── screens/
  │       ├── navigation/
  │       ├── services/
  │       └── ...                   # Other standard React Native directories
  ├── cline_docs/                   # Cline's project documentation
  ├── memory-bank/                  # Cline's memory and context files
  └── userInstructions/             # Step-by-step guides for user actions
```

## 📝 Development Priority: Expo Go iOS App Compatibility
The MVP must be fully functional and previewable through the Expo Go iOS App. Development focus prioritizes features that work seamlessly within Expo Go's constraints.

## 🤝 Contributing
This project is currently in early MVP development. Contribution guidelines will be established later.

## 📄 License
*(License information to be added if applicable)*
