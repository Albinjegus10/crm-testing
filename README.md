<<<<<<< HEAD
# Royal Accounts System

Complete CRM platform with public website, lead management, client management, attendance tracking, and automated reminders.

## Features

### Public Website
- Business information display
- Lead capture form
- Contact functionality

### CRM System
- Client management (CRUD)
- Excel import/export
- Document upload
- Search and filter

### Attendance System
- Check-in/Check-out
- Time tracking
- Hours calculation
- Export reports

### Automation
- GST reminders
- Reward reminders
- Scheduled notifications

### Authentication
- JWT-based authentication
- Role-based access (Admin/Staff)
- Protected routes

## Technology Stack

**Backend:**
- Django 4.2
- Django REST Framework
- MySQL
- Celery (task scheduling)
- JWT Authentication

**Frontend:**
- React 18
- React Router
- Ant Design
- Axios

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 8.0+
- Redis (for Celery)

### Backend Setup

1. **Create MySQL Database:**
```sql
CREATE DATABASE royal_accounts;
```

2. **Install Python Dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

3. **Configure Environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run Migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create Superuser:**
```bash
python manage.py createsuperuser
```

6. **Run Development Server:**
```bash
python manage.py runserver
```

### Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install
```

2. **Run Development Server:**
```bash
npm start
```

Frontend will run on http://localhost:3000
Backend API will run on http://localhost:8000

### Celery Setup (Optional - for automated reminders)

1. **Start Redis:**
```bash
redis-server
```

2. **Start Celery Worker:**
```bash
cd backend
celery -A config worker -l info
```

3. **Start Celery Beat:**
```bash
celery -A config beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

4. **Configure Periodic Tasks:**
- Go to Django Admin: http://localhost:8000/admin
- Navigate to Periodic Tasks
- Add tasks for `api.tasks.send_gst_reminders` and `api.tasks.send_reward_reminders`
- Set schedule (e.g., daily at 9 AM)

## API Endpoints

### Authentication
- `POST /api/login/` - Login

### Public
- `POST /api/submit-lead/` - Submit lead form

### Leads (Admin only)
- `GET /api/leads/` - List leads
- `PATCH /api/leads/{id}/` - Update lead status

### Clients
- `GET /api/clients/` - List clients
- `POST /api/clients/` - Create client
- `PATCH /api/clients/{id}/` - Update client
- `DELETE /api/clients/{id}/` - Delete client
- `POST /api/clients/import_excel/` - Import from Excel
- `GET /api/clients/export_excel/` - Export to Excel

### Attendance
- `GET /api/attendance/` - List attendance
- `POST /api/attendance/check_in/` - Check in
- `POST /api/attendance/check_out/` - Check out
- `GET /api/attendance/export_report/` - Export report

### Notifications
- `GET /api/notifications/` - List notifications

## Default Users

After creating superuser, you can:
- Login as admin with full access
- Create staff users via Django admin

## Excel Import Format

For client import, Excel file should have columns:
- name (required)
- phone (required)
- email (optional)
- gst_number (optional)
- address (optional)

## Security Features

- JWT token authentication
- Password hashing
- CORS protection
- File upload validation
- SQL injection prevention
- XSS protection

## Production Deployment

### Backend
1. Set `DEBUG=False` in .env
2. Configure `ALLOWED_HOSTS`
3. Use production database
4. Collect static files: `python manage.py collectstatic`
5. Use Gunicorn: `gunicorn config.wsgi:application`
6. Setup Nginx as reverse proxy

### Frontend
1. Build: `npm run build`
2. Serve build folder with Nginx or Apache
3. Update API URL in production

### Database
- Regular backups
- Use connection pooling
- Optimize indexes

### Celery
- Use supervisor for process management
- Monitor task queue
- Setup error logging

## Troubleshooting

**Database Connection Error:**
- Verify MySQL is running
- Check credentials in .env
- Ensure database exists

**CORS Error:**
- Update `CORS_ALLOWED_ORIGINS` in settings.py
- Check frontend URL matches

**Import Error:**
- Verify Excel file format
- Check required columns exist
- Ensure file size is reasonable

## License

Proprietary - Royal Accounts System
=======
# crm-testing
sample
>>>>>>> 5fbf7b5599dfeea7d9e108cab1a4d00cfcd60314
