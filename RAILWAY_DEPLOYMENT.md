# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository with your code

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Railway deployment setup"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 3. Deploy MySQL Database
1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will automatically create MySQL instance
4. Note: Database credentials are auto-configured via environment variables

### 4. Deploy Backend
1. Click "New" → "GitHub Repo"
2. Select your repository
3. Click "Add variables" and set:
   ```
   DEBUG=False
   SECRET_KEY=your-secret-key-here-generate-random-string
   ALLOWED_HOSTS=*.railway.app
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```
4. Go to "Settings" → "Root Directory" → Set to `backend`
5. Railway will auto-detect Django and deploy
6. Copy the backend URL (e.g., https://your-backend.railway.app)

### 5. Deploy Frontend
1. Click "New" → "GitHub Repo"
2. Select your repository again
3. Click "Add variables" and set:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```
4. Go to "Settings" → "Root Directory" → Set to `frontend`
5. Railway will auto-detect React and deploy
6. Copy the frontend URL

### 6. Update Backend CORS
1. Go to backend service in Railway
2. Update `FRONTEND_URL` variable with actual frontend URL:
   ```
   FRONTEND_URL=https://your-frontend.railway.app
   ```
3. Redeploy backend

### 7. Create Superuser
1. In backend service, go to "Settings" → "Deploy Logs"
2. Wait for deployment to complete
3. Click on service → "Variables" → Add:
   ```
   DJANGO_SUPERUSER_USERNAME=admin
   DJANGO_SUPERUSER_EMAIL=admin@example.com
   DJANGO_SUPERUSER_PASSWORD=your-secure-password
   ```
4. Or use Railway CLI:
   ```bash
   railway run python manage.py createsuperuser
   ```

## Environment Variables Summary

### Backend Service
```
DEBUG=False
SECRET_KEY=<generate-random-secret-key>
ALLOWED_HOSTS=*.railway.app
FRONTEND_URL=https://your-frontend.railway.app
MYSQLHOST=<auto-set-by-railway>
MYSQLPORT=<auto-set-by-railway>
MYSQLDATABASE=<auto-set-by-railway>
MYSQLUSER=<auto-set-by-railway>
MYSQLPASSWORD=<auto-set-by-railway>
```

### Frontend Service
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

## Verify Deployment

1. **Frontend**: Visit your frontend URL
2. **Backend API**: Visit `https://your-backend.railway.app/api/`
3. **Admin Panel**: Visit `https://your-backend.railway.app/admin/`

## Troubleshooting

### Database Connection Issues
- Ensure MySQL service is running
- Check that backend service has database environment variables
- Railway auto-links services, verify in "Variables" tab

### CORS Errors
- Verify `FRONTEND_URL` in backend matches actual frontend URL
- Check `ALLOWED_HOSTS` includes `*.railway.app`

### Static Files Not Loading
- Ensure `whitenoise` is in requirements.txt
- Check `collectstatic` runs during deployment
- Verify `STATIC_ROOT` is set correctly

### Build Failures
- Check deployment logs in Railway dashboard
- Ensure all dependencies are in requirements.txt
- Verify Python version compatibility

## Cost Optimization
- Railway offers $5 free credit monthly
- MySQL database and 2 services should fit within free tier for development
- Monitor usage in Railway dashboard

## Production Checklist
- ✅ DEBUG=False
- ✅ Strong SECRET_KEY
- ✅ ALLOWED_HOSTS configured
- ✅ Database backups enabled
- ✅ HTTPS enabled (automatic on Railway)
- ✅ Environment variables secured
- ✅ CORS properly configured

## Useful Commands

### Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser

# View logs
railway logs
```

## Support
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
