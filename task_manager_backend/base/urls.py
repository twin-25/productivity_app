from django.urls import path
from . import views


urlpatterns =[
  path('', views.getRoutes, name='routes' ),
  path('api/user/register/', views.register, name='user_register'),
  path('api/user/login/', views.MyTokenObtainPairView.as_view(), name='user-login'),

  path('api/tasks/', views.getTasks, name='get-tasks' ),
  path('api/tasks/today/', views.getTodaysTasks, name='todays-tasks'),
  path('api/tasks/tomorrow/', views.getTomorrowsTasks, name='tomorrows-tasks'),
  path('api/tasks/thisweek/', views.getLaterTasks, name='this-week-tasks'),
  path('api/tasks/create/', views.createTask, name = 'create-task'),

  path ('api/tags/', views.getTags, name = 'get-tags'),
  path ('api/tags/create/', views.createTag, name = 'create-tags'),

  path ('api/stickyNotes/', views.getStickyNotes, name = 'get-notes'),
  path ('api/stickyNotes/create/', views.createStickyNote, name = 'create-notes'),


  
  path('api/tasks/<int:pk>/', views.getTask, name = 'get-task'),
  path('api/tasks/<int:pk>/update/', views.updateTask, name = 'update-task'),
  path('api/tasks/<int:pk>/delete/', views.deleteTask, name = 'delete-task'),
  path('api/tags/<int:pk>/delete/', views.deleteTag, name='delete-tag'),
  path('api/stickyNotes/<int:pk>/update/', views.updateStickyNote, name = 'update-note'),
  path('api/stickyNotes/<int:pk>/delete/', views.deleteStickyNote, name = 'delete-note'),

]