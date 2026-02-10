from django.contrib import admin
from .models import Lead, Client, Attendance, Notification, Task

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'phone']

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'gst_number', 'created_by', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'phone', 'gst_number']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'check_in', 'check_out', 'hours_worked']
    list_filter = ['date', 'user']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['client', 'notification_type', 'sent_at']
    list_filter = ['notification_type', 'sent_at']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'assigned_to', 'status', 'priority', 'due_date', 'created_at']
    list_filter = ['status', 'priority', 'assigned_to']
    search_fields = ['title', 'description']
