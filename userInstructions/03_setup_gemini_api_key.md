# Setup GEMINI_API_KEY for KhaRom API Server

To enable the KhaRom API server to communicate with the Google Gemini service, you need to provide your Gemini API key as an environment variable.

Follow these steps:

1.  **Locate or Create `.env.local`:**
    *   In the `api-server` directory of the project, check if a file named `.env.local` already exists.
    *   If it does not exist, create a new file named `.env.local` in the `api-server` directory.

2.  **Add Your API Key:**
    *   Open the `api-server/.env.local` file in a text editor.
    *   Add the following line, replacing `YOUR_API_KEY_HERE` with your actual Google Gemini API key:
        ```
        GEMINI_API_KEY=YOUR_API_KEY_HERE
        ```
    *   Save the file.

3.  **Ensure `.env.local` is Git Ignored:**
    *   The `.env.local` file contains sensitive information and should **never** be committed to Git.
    *   Open the `.gitignore` file located in the `api-server` directory.
    *   Add the following line if it's not already present:
        ```
        .env.local
        ```
    *   Save the `api-server/.gitignore` file.

4.  **Restart API Server (If Running):**
    *   If the Next.js development server (`api-server`) is currently running, you'll need to stop it (usually `Ctrl+C` in the terminal) and restart it (`npm run dev` from within the `api-server` directory) for the new environment variable to be loaded.

Your API server should now be able to authenticate with the Google Gemini service.
