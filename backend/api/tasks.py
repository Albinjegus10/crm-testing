from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Client, Notification

@shared_task
def send_gst_reminders():
    tomorrow = timezone.now().date() + timedelta(days=1)
    clients = Client.objects.filter(gst_due_date=tomorrow)
    
    for client in clients:
        message = f"GST reminder for {client.name}. Due date: {client.gst_due_date}"
        Notification.objects.create(
            client=client,
            notification_type='gst',
            message=message
        )
        print(f"GST reminder sent to {client.name}")
    
    return f"Sent {clients.count()} GST reminders"

@shared_task
def send_reward_reminders():
    tomorrow = timezone.now().date() + timedelta(days=1)
    clients = Client.objects.filter(reward_due_date=tomorrow)
    
    for client in clients:
        message = f"Reward reminder for {client.name}. Due date: {client.reward_due_date}"
        Notification.objects.create(
            client=client,
            notification_type='reward',
            message=message
        )
        print(f"Reward reminder sent to {client.name}")
    
    return f"Sent {clients.count()} reward reminders"
