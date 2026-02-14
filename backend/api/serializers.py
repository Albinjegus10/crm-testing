from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Lead, Client, Attendance, Notification, Task, UserProfile

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active', 'role', 'created_by']
    
    def get_role(self, obj):
        if obj.is_superuser:
            return 'admin'
        if hasattr(obj, 'profile'):
            return obj.profile.role
        return 'staff'
    
    def get_created_by(self, obj):
        if hasattr(obj, 'profile') and obj.profile.created_by:
            return {'id': obj.profile.created_by.id, 'username': obj.profile.created_by.username}
        return None

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Client
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Attendance
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.name', read_only=True)
    
    class Meta:
        model = Notification
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True)
    
    class Meta:
        model = Task
        fields = '__all__'
