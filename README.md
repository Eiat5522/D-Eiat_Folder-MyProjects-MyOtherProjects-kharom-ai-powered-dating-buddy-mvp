# KhaRom AI-Powered Dating Buddy MVP 🇹🇭❤️

KhaRom is a mobile AI chat application designed to help users craft confident, culturally nuanced Thai chat messages for dating scenarios. Users type their message prompts and receive instant AI-generated replies in Thai.

**This project is currently in the MVP development phase.**

## ✨ Core Features (MVP)
-   **🤖 AI-Powered Chat Interface:** Get AI-generated responses in Thai.
-   **💬 Chat History:** Create, rename, and manage multiple chat sessions with persistent storage.
-   **🌐 UI Language Toggle:** Switch the app's interface between Thai and English. (AI responses remain Thai-only).
-   **👍👎 Robust UX Feedback:** Graceful error handling, message retry options, and thumbs-up/down feedback for AI replies.

## 🎯 Target Users
Thai-speaking singles (18–35) looking for assistance in:
-   Breaking the ice.
-   Improving dating conversations.
-   Practicing Thai chat in a fun, guided way.

## 🛠️ Tech Stack

### Mobile Application (Frontend)
-   **Framework:** React Native (Expo SDK 53)
-   **Language:** TypeScript
-   **Styling:** React Native `StyleSheet` API
-   **Localization:** i18next
-   **State Management:** React Context API
-   **Data Persistence:** AsyncStorage
-   **Navigation:** React Navigation (Drawer)

### Backend API (Proxy)
-   **Framework:** Next.js (v14+ with App Router)
-   **Language:** TypeScript
-   **Deployment:** Vercel / Railway

### AI Service
-   **Provider:** OpenRouter (e.g., using Mistral Small model)

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
    - Add your OpenRouter API key and optionally a default model to this file:
      ```env
      OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
      OPENROUTER_DEFAULT_MODEL=mistralai/mistral-small-24b-instruct-2501 # Or your preferred default
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
- **Phase 1: Backend API Proxy (Next.js):** ✅ Completed (Initially Gemini, now OpenRouter)
- **Phase X: AI Provider Migration & API Server Updates:** ✅ Completed (Migrated to OpenRouter, configured, tested)
- **Phase 2: Core Chat UI & Logic (React Native):** ✅ Completed (Core chat flow functional)
- **Phase 3: Localization (React Native):** ✅ Completed (Language toggle in drawer)
- **Phase 4: UX Feedback Mechanisms (React Native):** ✅ Completed (Feedback, retry, error handling)
- **Phase C: Session-Based Chat History:** ✅ Completed (Creation, storage, management, custom titles)
- **Phase 5: Testing & Refinement:** 🔄 In Progress (Current Focus)

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
  │                   └── route.ts  # OpenRouter API proxy endpoint
  ├── mobile-app/                   # React Native (Expo) Mobile Application
  │   ├── README.md                 # Mobile App specific README
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
