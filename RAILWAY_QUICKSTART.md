# Railway Deployment - Quick Start

## Step-by-Step Deployment

### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub

### 2. Install Railway CLI (Optional)
```bash
npm install -g @railway/cli
railway login
```

### 3. Deploy MySQL Database
1. New Project → Add MySQL
2. Railway will auto-generate connection variables

### 4. Deploy Backend
1. New → GitHub Repo → Select your repo
2. Settings → Root Directory: `backend`
3. Variables → Add:
```
SECRET_KEY=django-insecure-change-this-in-production-12345
DEBUG=False
ALLOWED_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}
DB_NAME=${{MYSQL_DATABASE}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
FRONTEND_URL=https://your-frontend-url.railway.app
```
4. Deploy automatically starts
5. Copy backend URL

### 5. Deploy Frontend
1. New → GitHub Repo → Same repo
2. Settings → Root Directory: `frontend`
3. Variables → Add:
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```
4. Deploy automatically starts
5. Copy frontend URL

### 6. Update Backend CORS
1. Go to backend service
2. Update `FRONTEND_URL` variable with actual frontend URL
3. Redeploy

### 7. Create Admin User
Using Railway CLI:
```bash
railway link
cd backend
railway run python manage.py createsuperuser
```

Or use Railway web shell if available.

## URLs After Deployment
- Frontend: `https://your-frontend.railway.app`
- Backend API: `https://your-backend.railway.app/api/`
- Admin Panel: `https://your-backend.railway.app/admin/`

## Cost
- Free tier: $5 credit/month
- Paid: ~$10-15/month for all services

## Support
Check Railway docs: https://docs.railway.app
