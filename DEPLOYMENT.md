# 🚀 Deployment Guide for FitLife

This guide will help you deploy your FitLife application using **Render for backend** and **Vercel for frontend**.

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] MongoDB Atlas account and cluster set up
- [ ] Git repository with your code
- [ ] Environment variables ready
- [ ] Render account (for backend)
- [ ] Vercel account (for frontend)

## 🔧 Environment Variables Setup

### Backend Environment Variables (Render)
Create a `.env` file in the `server` directory for local testing:

```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# MongoDB Configuration
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Client URL (for CORS) - Optional: if not set, allows all origins
CLIENT_URL=https://your-vercel-frontend-domain.vercel.app
```

### Frontend Environment Variables (Vercel)
Create a `.env` file in the `client` directory for local testing:

```bash
# API Configuration
REACT_APP_API_URL=https://your-render-backend-domain.onrender.com
```

## 🌐 Deployment Steps

### Step 1: Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit [Render Dashboard](https://dashboard.render.com)
   - Sign up/Login to your account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Backend Service**
   - **Name**: `fitlife-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

4. **Set Environment Variables**
   In the Render dashboard, add these environment variables:
   ```
   NODE_ENV=production
   MONGODB_URL=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=https://your-vercel-frontend-domain.vercel.app
   ```
   
   **Note**: If you don't set `CLIENT_URL`, CORS will allow all origins (less secure but easier for development).

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Note down your backend URL (e.g., `https://fitlife-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Sign up/Login to your account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Frontend Project**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Set Environment Variables**
   In the Vercel dashboard, add this environment variable:
   ```
   REACT_APP_API_URL=https://your-render-backend-domain.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend
   - Note down your frontend URL (e.g., `https://fitlife-frontend.vercel.app`)

### Step 3: Update CORS Settings (Optional)

After both deployments are complete, you can optionally update the CORS settings for better security:

1. **Update Backend CORS**
   - Go back to your Render backend service
   - Update the `CLIENT_URL` environment variable with your actual Vercel frontend URL:
   ```
   CLIENT_URL=https://your-actual-vercel-domain.vercel.app
   ```
   - Redeploy the backend service

2. **Update Frontend API URL**
   - Go back to your Vercel frontend project
   - Update the environment variable with your actual Render backend URL:
   ```
   REACT_APP_API_URL=https://your-actual-render-backend-domain.onrender.com
   ```
   - Redeploy the frontend

## 🔍 Post-Deployment Checklist

- [ ] Backend is accessible at your Render domain
- [ ] Frontend is accessible at your Vercel domain
- [ ] API endpoints are working (test `/health` endpoint)
- [ ] Database connection is established
- [ ] Authentication is working
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] SSL certificates are working (automatic with Render/Vercel)

## 🚨 Common Issues & Solutions

### CORS Errors
- If you set `CLIENT_URL`, ensure it matches your Vercel domain exactly
- If you don't set `CLIENT_URL`, CORS will allow all origins automatically
- Make sure both URLs use HTTPS

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check network access settings in MongoDB Atlas
- Ensure IP whitelist includes Render's IP ranges (or set to 0.0.0.0/0 for all IPs)

### Build Failures
- Check Node.js version compatibility (Render uses Node 18 by default)
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Authentication Issues
- Verify JWT_SECRET is set and consistent
- Check cookie settings for cross-domain requests
- Ensure HTTPS is used (automatic with Render/Vercel)

### Frontend Not Connecting to Backend
- Verify `REACT_APP_API_URL` in Vercel matches your Render backend URL
- Check that the backend is running and accessible
- Test the API endpoints directly

## 📞 Support

If you encounter issues during deployment:

1. **Check Render Logs**
   - Go to your Render service dashboard
   - Check the "Logs" tab for build and runtime errors

2. **Check Vercel Logs**
   - Go to your Vercel project dashboard
   - Check the "Functions" tab for build logs

3. **Test Locally**
   - Test with production environment variables locally
   - Verify all environment variables are set correctly

4. **Platform Documentation**
   - [Render Documentation](https://render.com/docs)
   - [Vercel Documentation](https://vercel.com/docs)

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs) 