from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login, signup, forgot_password, submit_lead, get_staff_users,
    LeadViewSet, ClientViewSet, AttendanceViewSet, NotificationViewSet, TaskViewSet, UserViewSet
)

router = DefaultRouter()
router.register('leads', LeadViewSet)
router.register('clients', ClientViewSet)
router.register('attendance', AttendanceViewSet)
router.register('notifications', NotificationViewSet)
router.register('tasks', TaskViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('login/', login),
    path('signup/', signup),
    path('forgot-password/', forgot_password),
    path('submit-lead/', submit_lead),
    path('staff-users/', get_staff_users),
    path('', include(router.urls)),
]
