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

Run the end-to-end tests:
```bash
npm run test:e2e
```

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
