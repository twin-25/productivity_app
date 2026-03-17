from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.hashers import make_password
from .serializers import ( MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken)
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User




# Create your views here.

def getRoutes(request):
  routes = [
    # Auth
    {'url': 'api/user/register',                        'method': 'POST'},
    {'url': 'api/user/login',                           'method': 'POST'},
    {'url': 'api/user/token/refresh',                   'method': 'POST'},

    # Tasks
    {'url': 'api/tasks/',                               'method': 'GET, POST'},
    {'url': 'api/tasks/today/',                         'method': 'GET'},
    {'url': 'api/tasks/upcoming/',                      'method': 'GET'},
    {'url': 'api/tasks/<int:pk>/',                      'method': 'GET, PUT, DELETE'},

    # Subtasks
    {'url': 'api/tasks/<int:pk>/subtasks/',             'method': 'GET, POST'},
    {'url': 'api/tasks/<int:pk>/subtasks/<int:sub_pk>/', 'method': 'PUT, DELETE'},

    # Tags
    {'url': 'api/tags/',                                'method': 'GET, POST'},
    {'url': 'api/tags/<int:pk>/',                       'method': 'PUT, DELETE'},

    # Sticky Notes
    {'url': 'api/stickynotes/',                         'method': 'GET, POST'},
    {'url': 'api/stickynotes/<int:pk>/',                'method': 'GET, PUT, DELETE'},

    # Calendar
    {'url': 'api/calendar/',                            'method': 'GET, POST'},
    {'url': 'api/calendar/<int:pk>/',                   'method': 'GET, PUT, DELETE'},
]

#authentication 

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
  data = request.data
  try:
    user = User.objects.create(
    username =  data['username'],
    email = data['email'],
    password = make_password(data['password']),
    )
    serializer = UserSerializerWithToken(user, many = False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  except:
    return Response({'detail': 'user with this email or username already exixts'}, status=status.HTTP_400_BAD_REQUEST)
  
class MyTokenObtainPairView (TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer
  
  