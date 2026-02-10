# Deploy to Railway - Complete Guide

**Repository:** https://github.com/Albinjegus10/crm

## Step 1: Push Latest Changes

```bash
cd c:\PROJECTS\crm
git add .
git commit -m "Add Railway deployment config"
git push origin main
```

## Step 2: Railway Setup

### A. Create Railway Project
1. Go to https://railway.app
2. Login with GitHub
3. Click **"New Project"**

### B. Add MySQL Database
1. Click **"+ New"** → **"Database"** → **"Add MySQL"**
2. Wait for deployment (30 seconds)
3. MySQL variables auto-created: `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`

### C. Deploy Backend
1. Click **"+ New"** → **"GitHub Repo"**
2. Select **"Albinjegus10/crm"**
3. Click **"Add Variables"** and paste:
```
SECRET_KEY=django-insecure-railway-prod-key-change-this-12345
DEBUG=False
ALLOWED_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}
DB_NAME=${{MYSQL_DATABASE}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
FRONTEND_URL=temp
```
4. Go to **"Settings"** → **"Root Directory"** → Enter: `backend`
5. Click **"Deploy"**
6. Wait for deployment, then copy backend URL (e.g., `https://crm-backend-production.up.railway.app`)

### D. Deploy Frontend
1. Click **"+ New"** → **"GitHub Repo"**
2. Select **"Albinjegus10/crm"** again
3. Click **"Add Variables"** and paste (replace with your backend URL):
```
REACT_APP_API_URL=https://crm-backend-production.up.railway.app
```
4. Go to **"Settings"** → **"Root Directory"** → Enter: `frontend`
5. Click **"Deploy"**
6. Wait for deployment, then copy frontend URL (e.g., `https://crm-frontend-production.up.railway.app`)

### E. Update Backend CORS
1. Go to **Backend service** → **"Variables"**
2. Update `FRONTEND_URL` to your actual frontend URL
3. Update `ALLOWED_HOSTS` to: `${{RAILWAY_PUBLIC_DOMAIN}},crm-frontend-production.up.railway.app`
4. Click **"Redeploy"**

## Step 3: Create Admin User

### Option A: Railway CLI
```bash
npm install -g @railway/cli
railway login
railway link
cd backend
railway run python manage.py createsuperuser
```

### Option B: Railway Dashboard
1. Backend service → **"Settings"** → **"Service"**
2. If shell available, run: `python manage.py createsuperuser`

## Your Live URLs

- **Frontend:** https://your-frontend.up.railway.app
- **Backend API:** https://your-backend.up.railway.app/api/
- **Admin Panel:** https://your-backend.up.railway.app/admin/

## Troubleshooting

**Build fails?**
- Check Railway logs
- Verify `backend` and `frontend` folders exist in repo

**Database connection error?**
- Ensure MySQL service is running
- Check `DB_*` variables reference MySQL service

**CORS error?**
- Update `FRONTEND_URL` in backend variables
- Redeploy backend

**Static files not loading?**
- Check backend logs for collectstatic errors
- Verify whitenoise is in requirements.txt

## Cost
- **Free tier:** $5 credit/month
- **Paid:** ~$10-15/month for 3 services

## Done! 🚀
Your CRM is now live on Railway with MySQL database.
