# KhaRom API Server (Next.js)

This directory contains the Next.js backend API for the KhaRom project. It acts as a secure proxy to the Google Gemini API, handling AI-powered chat message generation.

## ✨ Features
-   Securely proxies requests to the Google Gemini API.
-   Manages the `GEMINI_API_KEY` via environment variables.
-   Provides the `/api/chat` endpoint for the mobile application.
-   Includes robust error handling and content safety checks.
-   Deployed on Vercel.

## 🛠️ Tech Stack
-   **Framework:** Next.js (v15.3.2 with App Router)
-   **Language:** TypeScript
-   **AI Service:** Google Gemini
-   **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
-   Node.js (LTS version recommended)
-   npm or yarn

### Setup Instructions

1.  **Navigate to the `api-server` directory:**
    ```bash
    cd api-server 
    # (If you are in the project root)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    -   Create a file named `.env.local` in the `api-server/` directory.
    -   Add your Google Gemini API key to this file:
        ```env
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    -   Replace `YOUR_GEMINI_API_KEY` with your actual key. This file is gitignored and should not be committed.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The API server will start, typically on `http://localhost:3000`.

## API Endpoint

### `/api/chat`
-   **Method:** `POST`
-   **Description:** Receives a user's message prompt and returns an AI-generated Thai chat response from Google Gemini.
-   **Request Body:**
    ```json
    {
      "prompt": "Your message prompt here"
    }
    ```
-   **Success Response (200 OK):**
    ```json
    {
      "reply": "AI-generated Thai message",
      "error": null
    }
    ```
-   **Error Response (e.g., 400, 401, 429, 500, 503):**
    ```json
    {
      "reply": null,
      "error": "User-friendly error message",
      "blocked": boolean, // Optional: true if content was blocked
      "blockReason": "Reason for block" // Optional: reason if content was blocked
    }
    ```

## ⚙️ Configuration
-   **ESLint & Prettier:** Configured for code linting and formatting. Use `npm run lint` or `npm run lint:fix`.
-   **TypeScript:** Strict mode enabled for better code quality.

## 🌐 Deployment
-   This API is automatically deployed to **Vercel** upon pushes to the `main` branch of the GitHub repository.
-   The `GEMINI_API_KEY` environment variable must be configured in the Vercel project settings for the deployed application to function.
-   **Production Endpoint:** `https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat`

## 🤝 Contributing
Refer to the main project `README.md` in the root directory for overall project contribution guidelines.
