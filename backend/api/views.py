from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Q
from datetime import datetime, timedelta
import pandas as pd
from .models import Lead, Client, Attendance, Notification, Task, UserProfile
from .serializers import (
    UserSerializer, LeadSerializer, ClientSerializer,
    AttendanceSerializer, NotificationSerializer, TaskSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        # In production, send actual email with reset link
        return Response({'message': 'Password reset email sent'})
    except User.DoesNotExist:
        return Response({'message': 'Password reset email sent'})  # Don't reveal if email exists

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_lead(request):
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = Lead.objects.all()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Client.objects.all()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(phone__icontains=search) | 
                Q(gst_number__icontains=search)
            )
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['post'])
    def import_excel(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(file)
            required_cols = ['name', 'phone']
            if not all(col in df.columns for col in required_cols):
                return Response({'error': 'Missing required columns'}, status=status.HTTP_400_BAD_REQUEST)
            
            created = 0
            for _, row in df.iterrows():
                Client.objects.create(
                    name=row['name'],
                    phone=row['phone'],
                    email=row.get('email', ''),
                    gst_number=row.get('gst_number', ''),
                    address=row.get('address', ''),
                    created_by=request.user
                )
                created += 1
            
            return Response({'message': f'{created} clients imported'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def export_excel(self, request):
        from django.http import HttpResponse
        clients = Client.objects.all().values('name', 'email', 'phone', 'gst_number', 'address')
        df = pd.DataFrame(list(clients))
        
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=clients.xlsx'
        df.to_excel(response, index=False)
        return response

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Attendance.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(user=self.request.user)
        
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)
        
        return queryset

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        today = timezone.now().date()
        if Attendance.objects.filter(user=request.user, date=today).exists():
            return Response({'error': 'Already checked in today'}, status=status.HTTP_400_BAD_REQUEST)
        
        attendance = Attendance.objects.create(
            user=request.user,
            check_in=timezone.now(),
            date=today
        )
        return Response(AttendanceSerializer(attendance).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def check_out(self, request):
        today = timezone.now().date()
        try:
            attendance = Attendance.objects.get(user=request.user, date=today, check_out__isnull=True)
            attendance.check_out = timezone.now()
            duration = attendance.check_out - attendance.check_in
            attendance.hours_worked = round(duration.total_seconds() / 3600, 2)
            attendance.save()
            return Response(AttendanceSerializer(attendance).data)
        except Attendance.DoesNotExist:
            return Response({'error': 'No active check-in found'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def export_report(self, request):
        from django.http import HttpResponse
        queryset = self.get_queryset()
        data = queryset.values('user__username', 'date', 'check_in', 'check_out', 'hours_worked')
        df = pd.DataFrame(list(data))
        
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=attendance_report.xlsx'
        df.to_excel(response, index=False)
        return response

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(assigned_to=self.request.user)
        
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        assigned_to = self.request.query_params.get('assigned_to')
        if assigned_to:
            queryset = queryset.filter(assigned_to_id=assigned_to)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def start_task(self, request, pk=None):
        task = self.get_object()
        task.status = 'in_progress'
        task.started_at = timezone.now()
        task.save()
        return Response(TaskSerializer(task).data)

    @action(detail=True, methods=['post'])
    def complete_task(self, request, pk=None):
        task = self.get_object()
        task.status = 'completed'
        task.completed_at = timezone.now()
        actual_hours = request.data.get('actual_hours')
        if actual_hours:
            task.actual_hours = actual_hours
        task.save()
        return Response(TaskSerializer(task).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_staff_users(request):
    users = User.objects.filter(is_active=True)
    return Response(UserSerializer(users, many=True).data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return User.objects.all()
        elif hasattr(user, 'profile') and user.profile.role == 'hr':
            return User.objects.filter(Q(profile__role='staff') | Q(id=user.id))
        return User.objects.filter(id=user.id)

    def create(self, request):
        user = request.user
        role = request.data.get('role')
        
        # Permission check
        if not user.is_superuser and not (hasattr(user, 'profile') and user.profile.role == 'hr'):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        if user.profile.role == 'hr' and role != 'staff':
            return Response({'error': 'HR can only create staff users'}, status=status.HTTP_403_FORBIDDEN)
        
        # Create user
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        new_user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_staff=True
        )
        
        # Create profile
        UserProfile.objects.create(
            user=new_user,
            role=role,
            created_by=user
        )
        
        return Response(UserSerializer(new_user).data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        user = request.user
        target_user = self.get_object()
        
        # Permission check
        if not user.is_superuser:
            if not (hasattr(user, 'profile') and user.profile.role == 'hr'):
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
            if hasattr(target_user, 'profile') and target_user.profile.role != 'staff':
                return Response({'error': 'HR can only edit staff users'}, status=status.HTTP_403_FORBIDDEN)
        
        # Update user
        target_user.email = request.data.get('email', target_user.email)
        target_user.first_name = request.data.get('first_name', target_user.first_name)
        target_user.last_name = request.data.get('last_name', target_user.last_name)
        target_user.is_active = request.data.get('is_active', target_user.is_active)
        target_user.save()
        
        # Update profile
        if hasattr(target_user, 'profile'):
            target_user.profile.role = request.data.get('role', target_user.profile.role)
            target_user.profile.save()
        
        return Response(UserSerializer(target_user).data)

    def destroy(self, request, pk=None):
        user = request.user
        target_user = self.get_object()
        
        if target_user.is_superuser:
            return Response({'error': 'Cannot delete admin user'}, status=status.HTTP_403_FORBIDDEN)
        
        # Permission check
        if not user.is_superuser:
            if not (hasattr(user, 'profile') and user.profile.role == 'hr'):
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
            if hasattr(target_user, 'profile') and target_user.profile.role != 'staff':
                return Response({'error': 'HR can only delete staff users'}, status=status.HTTP_403_FORBIDDEN)
        
        target_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
