# KhaRom API Server

## Environment Variables

The following environment variables need to be set in your Vercel deployment:

```
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_DEFAULT_MODEL=mistralai/mistral-small-24b-instruct-2501
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with the required environment variables.

3. Run the development server:
```bash
npm run dev
```

## Testing

End-to-end tests using Playwright have been removed from this project. Manual testing of the API can be performed using tools like `curl` or Postman.

Example `curl` command:
```bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{"prompt":"Hello, how are you?"}'
```
(Replace `http://localhost:3000` with the deployed Vercel URL for testing the production deployment.)

## API Endpoints

### POST /api/chat
Send chat messages to the AI model.

Request body:
```json
{
  "prompt": "Your message here"
}
```

Response:
```json
{
  "reply": "AI response here",
  "error": null
}
```

Or in case of error:
```json
{
  "reply": null,
  "error": "Error message here"
}
