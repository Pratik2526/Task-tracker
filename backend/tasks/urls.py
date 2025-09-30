from django.urls import path
from .views import TaskListCreateView, TaskDetailAPIView

urlpatterns = [
    path('tasks/',TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<uuid:pk>/', TaskDetailAPIView.as_view(), name='task-detail'),
]