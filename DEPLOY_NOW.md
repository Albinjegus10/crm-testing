# Deploy to Railway - Final Steps

✅ **Code pushed to:** https://github.com/Albinjegus10/crm

## Railway Deployment (5 minutes)

### 1. Go to Railway
https://railway.app → Login with GitHub

### 2. Create New Project
Click **"New Project"**

### 3. Add MySQL
- Click **"+ New"** → **"Database"** → **"Add MySQL"**
- Wait 30 seconds for deployment

### 4. Deploy Backend
- Click **"+ New"** → **"GitHub Repo"** → Select **"Albinjegus10/crm"**
- **Settings** → **Root Directory:** `backend`
- **Variables** → Add these:

```
SECRET_KEY=django-prod-key-change-this-12345
DEBUG=False
ALLOWED_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}
DB_NAME=${{MYSQL_DATABASE}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
FRONTEND_URL=temp
```

- Click **"Deploy"**
- Copy backend URL (e.g., `backend-production-xxxx.up.railway.app`)

### 5. Deploy Frontend
- Click **"+ New"** → **"GitHub Repo"** → Select **"Albinjegus10/crm"**
- **Settings** → **Root Directory:** `frontend`
- **Variables** → Add:

```
REACT_APP_API_URL=https://YOUR-BACKEND-URL.up.railway.app
```

- Click **"Deploy"**
- Copy frontend URL

### 6. Update Backend CORS
- Go to **Backend service** → **Variables**
- Update `FRONTEND_URL` to your frontend URL
- Update `ALLOWED_HOSTS` to: `${{RAILWAY_PUBLIC_DOMAIN}},YOUR-FRONTEND-URL.up.railway.app`
- Click **"Redeploy"**

### 7. Create Admin User
```bash
npm install -g @railway/cli
railway login
railway link
cd backend
railway run python manage.py createsuperuser
```

## Done! 🚀

- **Frontend:** https://your-frontend.up.railway.app
- **Admin:** https://your-backend.up.railway.app/admin
- **API:** https://your-backend.up.railway.app/api/

## Cost: ~$10-15/month
