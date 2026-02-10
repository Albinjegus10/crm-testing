# Deployment Guide - Royal Accounts System

## Production Deployment Checklist

### 1. Backend (Django) Deployment

#### Environment Configuration
```bash
# .env for production
SECRET_KEY=<generate-strong-secret-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

DB_NAME=royal_accounts_prod
DB_USER=prod_user
DB_PASSWORD=<strong-password>
DB_HOST=localhost
DB_PORT=3306

FRONTEND_URL=https://yourdomain.com
```

#### Install Production Server
```bash
pip install gunicorn
```

#### Collect Static Files
```bash
python manage.py collectstatic --noinput
```

#### Run with Gunicorn
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/backend/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 2. Frontend (React) Deployment

#### Build Production Bundle
```bash
cd frontend
npm run build
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

### 3. Database Setup

#### Create Production Database
```sql
CREATE DATABASE royal_accounts_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON royal_accounts_prod.* TO 'prod_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Run Migrations
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 4. Celery Setup (Background Tasks)

#### Supervisor Configuration
```ini
[program:celery_worker]
command=/path/to/venv/bin/celery -A config worker -l info
directory=/path/to/backend
user=www-data
autostart=true
autorestart=true

[program:celery_beat]
command=/path/to/venv/bin/celery -A config beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
directory=/path/to/backend
user=www-data
autostart=true
autorestart=true
```

### 5. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 6. Security Hardening

- Enable firewall (UFW)
- Disable root SSH login
- Use SSH keys only
- Regular security updates
- Database backups
- Monitor logs

### 7. Monitoring

- Setup error logging (Sentry)
- Monitor server resources
- Database performance monitoring
- Celery task monitoring

## Quick Deploy Script

```bash
#!/bin/bash
# deploy.sh

# Backend
cd /path/to/backend
git pull
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn
sudo systemctl restart celery_worker
sudo systemctl restart celery_beat

# Frontend
cd /path/to/frontend
git pull
npm install
npm run build
sudo systemctl reload nginx

echo "Deployment complete!"
```

## Backup Strategy

### Database Backup
```bash
# Daily backup script
mysqldump -u prod_user -p royal_accounts_prod > backup_$(date +%Y%m%d).sql
```

### Media Files Backup
```bash
tar -czf media_backup_$(date +%Y%m%d).tar.gz /path/to/backend/media/
```

## Rollback Plan

1. Keep previous version tagged in Git
2. Database backup before migration
3. Quick rollback script ready
4. Test rollback procedure

## Performance Optimization

- Enable Redis caching
- Database query optimization
- CDN for static files
- Gzip compression
- Browser caching headers
