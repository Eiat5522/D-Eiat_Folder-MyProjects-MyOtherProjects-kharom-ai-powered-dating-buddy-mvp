# Deploying the API Server to Vercel

## Prerequisites
1. GitHub repository with the latest code pushed
2. A Vercel account (create one at https://vercel.com if needed)
3. Your Google Gemini API key

## Deployment Steps

### 1. Connect to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login" (if you already have an account)
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 2. Import Your Repository
1. Once logged in, click "Add New Project"
2. Select the "kharom-ai-powered-dating-buddy-mvp" repository
3. You'll be taken to the project configuration page

### 3. Configure Project
1. **Project Name:** Choose a name (e.g., "kharom-api")
2. **Framework Preset:** It should automatically detect Next.js
3. **Root Directory:** Select `api-server` as the root directory
4. **Build and Output Settings:** Leave as default (automatically configured for Next.js)

### 4. Environment Variables
1. Expand the "Environment Variables" section
2. Add the following variable:
   - NAME: `GEMINI_API_KEY`
   - VALUE: Your Google Gemini API key (from `.env.local`)
3. Make sure the variable is selected for "Production" environment
4. Click "Deploy"

### 5. Monitor Deployment
1. Vercel will automatically:
   - Install dependencies
   - Build the project
   - Deploy to their edge network
2. Watch the deployment logs for any issues
3. Wait for the "Success" message

### 6. Test Deployment
1. Once deployed, you'll get a production URL (e.g., `https://kharom-api.vercel.app`)
2. Test the API endpoint:
   ```bash
   curl -X POST https://kharom-api.vercel.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"prompt":"Hello"}'
   ```
3. Verify you get a proper response (not an error)

### 7. Custom Domain (Optional)
1. In your project settings, go to "Domains"
2. Add your custom domain if desired
3. Follow Vercel's DNS configuration instructions

## Troubleshooting

### Common Issues
1. **Build Fails:**
   - Check the build logs
   - Verify all dependencies are in package.json
   - Ensure Node.js version is compatible

2. **Runtime Errors:**
   - Check if environment variables are set correctly
   - Verify the API endpoint URL is correct
   - Look for errors in Vercel's Function Logs

3. **API Not Responding:**
   - Verify the endpoint path (/api/chat)
   - Check if GEMINI_API_KEY is properly set
   - Look for rate limiting or API key issues

## Maintenance
1. Future code updates pushed to GitHub will automatically trigger new deployments
2. Monitor usage and logs in Vercel dashboard
3. Keep your GEMINI_API_KEY secure and rotate if needed

## Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://nextjs.org/docs/deployment)
- [Environment Variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
