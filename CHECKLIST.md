# Railway Deployment Checklist

## Pre-Deployment
- [ ] Push all changes to GitHub: https://github.com/Albinjegus10/crm
```bash
git add .
git commit -m "Railway deployment ready"
git push origin main
```

## Railway Dashboard (https://railway.app)

### 1. MySQL Database
- [ ] New Project → Add MySQL
- [ ] Note: Variables auto-created

### 2. Backend Service
- [ ] New → GitHub Repo → Albinjegus10/crm
- [ ] Root Directory: `backend`
- [ ] Add Variables:
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=${{RAILWAY_PUBLIC_DOMAIN}}
DB_NAME=${{MYSQL_DATABASE}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
FRONTEND_URL=temp
```
- [ ] Deploy & copy URL

### 3. Frontend Service
- [ ] New → GitHub Repo → Albinjegus10/crm
- [ ] Root Directory: `frontend`
- [ ] Add Variable:
```
REACT_APP_API_URL=<backend-url>
```
- [ ] Deploy & copy URL

### 4. Update Backend
- [ ] Update `FRONTEND_URL` to frontend URL
- [ ] Redeploy

### 5. Create Admin
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Run: `railway login && railway link`
- [ ] Run: `cd backend && railway run python manage.py createsuperuser`

## Done! ✅
- Frontend: https://your-frontend.up.railway.app
- Admin: https://your-backend.up.railway.app/admin
