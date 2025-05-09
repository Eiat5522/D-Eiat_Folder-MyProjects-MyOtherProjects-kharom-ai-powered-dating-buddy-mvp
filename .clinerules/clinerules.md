Here's your completed **Project Configuration** tailored specifically for the **KhaRom** app:

---

# Project Configuration

## Tech Stack

* **React Native (Expo Bare)** for Mobile App
* **Next.js 14+ with App Router** for backend API (Gemini Proxy)
* **Tailwind CSS** for styling
* **Google Gemini** for AI-generated responses (Thai language)
* **Vercel** or **Railway** for backend deployment
* **GitHub** for version control

## Project Structure

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
```

## Backend API Routes (Next.js)

* API endpoints in `/src/app/api/*` should:

  * Be concise and follow RESTful conventions
  * Proxy requests securely to Google Gemini
  * Clearly define request and response structures
* Example: `/api/chat`

## Development Workflow

* Use GitHub branches and pull requests for all changes
* Cline assists with code scaffolding, reviews, and documentation
* Backend deployments via Vercel or Railway, triggered automatically on merge to main branch
* React Native mobile builds via EAS Build from Expo
* Regular code reviews and documentation updates maintained with Cline

## Security

Store all API keys securely in environment variables configured on the deployment platforms (Vercel or Railway).
