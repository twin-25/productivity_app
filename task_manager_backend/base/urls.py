from django.urls import path
from . import views


urlpatterns =[
  path('', views.getRoutes, name='routes' ),
  path('api/user/register/', views.register, name='user_register'),
  path('api/user/login/', views.MyTokenObtainPairView.as_view(), name='user-login'),
]