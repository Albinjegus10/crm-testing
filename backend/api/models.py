from django.db import models
from django.contrib.auth.models import User

class Lead(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='new', choices=[
        ('new', 'New'), ('contacted', 'Contacted'), ('converted', 'Converted')
    ])

    class Meta:
        ordering = ['-created_at']

class Client(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15)
    gst_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    gst_due_date = models.DateField(null=True, blank=True)
    reward_due_date = models.DateField(null=True, blank=True)
    documents = models.FileField(upload_to='client_docs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['-created_at']

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField(null=True, blank=True)
    date = models.DateField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ['-date', '-check_in']
        unique_together = ['user', 'date']

class Notification(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20, choices=[
        ('gst', 'GST Reminder'), ('reward', 'Reward Reminder')
    ])
    sent_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField()

    class Meta:
        ordering = ['-sent_at']

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_tasks')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_tasks')
    status = models.CharField(max_length=20, default='pending', choices=[
        ('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('cancelled', 'Cancelled')
    ])
    priority = models.CharField(max_length=20, default='medium', choices=[
        ('low', 'Low'), ('medium', 'Medium'), ('high', 'High')
    ])
    estimated_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    actual_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
