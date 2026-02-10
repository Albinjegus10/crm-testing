# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub account (recommended)

## Deployment Steps

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository

### 3. Deploy MySQL Database

1. In Railway project, click "New"
2. Select "Database" → "MySQL"
3. Note the connection details (will be auto-populated as environment variables)

### 4. Deploy Backend

1. Click "New" → "GitHub Repo"
2. Select your repository
3. Set Root Directory: `backend`
4. Add Environment Variables:
   ```
   SECRET_KEY=<generate-random-secret-key>
   DEBUG=False
   ALLOWED_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}
   DB_NAME=${{MYSQL_DATABASE}}
   DB_USER=${{MYSQL_USER}}
   DB_PASSWORD=${{MYSQL_PASSWORD}}
   DB_HOST=${{MYSQL_HOST}}
   DB_PORT=${{MYSQL_PORT}}
   FRONTEND_URL=${{FRONTEND_PUBLIC_URL}}
   DISABLE_COLLECTSTATIC=1
   ```
5. Deploy will start automatically
6. Note the backend URL (e.g., `https://your-backend.railway.app`)

### 5. Deploy Frontend

1. Click "New" → "GitHub Repo"
2. Select your repository
3. Set Root Directory: `frontend`
4. Add Environment Variables:
   ```
   REACT_APP_API_URL=<your-backend-url>
   ```
5. Add Build Command: `npm run build`
6. Deploy will start automatically

### 6. Update CORS Settings

After frontend deploys:
1. Go to backend service settings
2. Update `ALLOWED_HOSTS` to include both backend and frontend domains
3. Update `FRONTEND_URL` to your frontend Railway URL
4. Redeploy backend

### 7. Create Superuser

1. In Railway backend service, go to "Settings" → "Variables"
2. Click on service → "Deploy Logs"
3. Use Railway CLI or connect to shell:
   ```bash
   railway run python manage.py createsuperuser
   ```

Or use Railway's web terminal if available.

## Environment Variables Reference

### Backend Service
- `SECRET_KEY` - Django secret key (generate with: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- `DEBUG` - Set to `False` for production
- `ALLOWED_HOSTS` - Railway domain (use `${{RAILWAY_PUBLIC_DOMAIN}}`)
- `DB_NAME` - MySQL database name (use `${{MYSQL_DATABASE}}`)
- `DB_USER` - MySQL user (use `${{MYSQL_USER}}`)
- `DB_PASSWORD` - MySQL password (use `${{MYSQL_PASSWORD}}`)
- `DB_HOST` - MySQL host (use `${{MYSQL_HOST}}`)
- `DB_PORT` - MySQL port (use `${{MYSQL_PORT}}`)
- `FRONTEND_URL` - Frontend Railway URL

### Frontend Service
- `REACT_APP_API_URL` - Backend Railway URL

## Post-Deployment

### Access Admin Panel
- URL: `https://your-backend.railway.app/admin`
- Login with superuser credentials

### Test Application
1. Visit frontend URL
2. Test lead submission form
3. Login to CRM
4. Test client management features

## Troubleshooting

### Database Connection Issues
- Verify MySQL service is running
- Check environment variables are correctly set
- Ensure `${{MYSQL_*}}` variables are referencing the MySQL service

### Static Files Not Loading
- Check `STATIC_ROOT` and `STATIC_URL` in settings.py
- Verify `collectstatic` runs in start command
- Check Railway logs for errors

### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` in settings.py
- Add frontend Railway domain
- Redeploy backend

### Build Failures
- Check Railway build logs
- Verify requirements.txt has all dependencies
- Ensure Python version is compatible

## Scaling & Optimization

### Database
- Railway MySQL includes automatic backups
- Monitor database size in Railway dashboard
- Consider upgrading plan for more storage

### Backend
- Railway auto-scales based on traffic
- Monitor memory usage
- Add Redis for Celery if needed

### Frontend
- Served as static files (very efficient)
- Consider CDN for better performance
- Enable gzip compression

## Cost Estimation
- Hobby Plan: $5/month per service
- MySQL: Included in project
- Estimated: $10-15/month for all services

## Notes
- Celery/Redis setup optional (for automated reminders)
- File uploads stored in Railway volume (persistent storage)
- SSL certificates automatically provided
- Custom domains can be added in Railway settings
