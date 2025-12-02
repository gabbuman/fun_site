# Deployment Guide

## Quick Start - Deploy to Vercel (Recommended)

### Option 1: Deploy via GitHub (Easiest)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal website"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`
   - Click "Deploy"
   - Done! Your site will be live at `https://yourproject.vercel.app`

### Option 2: Deploy via Vercel CLI

**Note:** Requires Node.js 18+ (you currently have v16)

1. **Upgrade Node.js to v18+:**
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use nvm: `nvm install 18 && nvm use 18`

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   # Test deployment
   vercel

   # Production deployment
   vercel --prod
   ```

## Local Testing

### Option 1: Python Simple Server (Current Setup)

```bash
python local_server.py
```

Then visit: `http://localhost:8000`

### Option 2: Vercel Dev (Requires Node 18+)

```bash
vercel dev
```

Then visit: `http://localhost:3000`

## Post-Deployment

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Environment Variables (Not needed for this project)

All APIs used are public and require no API keys!

## Troubleshooting

### Node.js Version Error
- **Error:** `Unsupported engine { node: '>= 18' }`
- **Solution:** Upgrade Node.js to v18 or later, OR use GitHub deployment method (no local Node.js needed!)

### API Not Working
- **Chess API:** Check if Chess.com API is accessible
- **Dota API:** Verify Steam ID is correct
- **Solar API:** Ensure Open-Meteo API is accessible

### Styling Issues
- Clear browser cache (Ctrl+F5)
- Check browser console for errors
- Verify all CSS/JS files are being served correctly

## Project URLs After Deployment

- **Production:** `https://yourproject.vercel.app`
- **Custom Domain:** `https://yourdomain.com` (if configured)

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch to production
- Create preview deployments for pull requests
- Show build logs and deployment status

## Contact

For Vercel support: https://vercel.com/support
For bugs in this project: Create an issue in your GitHub repo
