# KhaRom API Server

This is the Next.js API proxy server that interfaces with OpenRouter's API to provide Thai-language dating advice responses. The server implements a "Thai Dating Guru" persona through system prompts.

## Environment Variables

The following environment variables need to be set in your `.env.local` file (development) and Vercel deployment (production):

```bash
# Required: Your OpenRouter API key
OPENROUTER_API_KEY=your_api_key_here

# Optional: Default model ID (if not specified, will use qwen/qwen2-7b-instruct)
OPENROUTER_DEFAULT_MODEL=qwen/qwen2-7b-instruct
```

You can get an API key from [OpenRouter](https://openrouter.ai/) and optionally specify your preferred model.

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

Manual testing of the API can be performed using tools like `curl` or Postman. The server is configured to respond only in Thai language, regardless of the input language.

Example `curl` commands:

**Development:**
```bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{"prompt":"How do I start a conversation with someone I like?"}'
```

**Production:**
```bash
curl -X POST https://your-vercel-deployment-url/api/chat \
-H "Content-Type: application/json" \
-d '{"prompt":"How do I start a conversation with someone I like?"}'
```

The API will respond in Thai language with dating-focused advice.

## API Endpoints

### POST /api/chat
Send chat messages to the AI model.

Request body:
```json
{
  "prompt": "Your message here"
}
```

Success Response:
```json
{
  "reply": "สวัสดีค่ะ! การเริ่มต้นบทสนทนา...", // Thai language response
  "error": null,
  "blocked": false
}
```

Error Response:
```json
{
  "reply": null,
  "error": "Error message here",
  "blocked": false
}
```

Content Blocking Response:
```json
{
  "reply": null,
  "error": "This content has been blocked.",
  "blocked": true,
  "blockReason": "Content policy violation"
}
