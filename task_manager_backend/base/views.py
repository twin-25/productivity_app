from .models import User, Task, Tag

from django.utils import timezone
from datetime import timedelta, date
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.hashers import make_password
from .serializers import ( MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken, TaskSerializer, TagSerializer)
from rest_framework_simplejwt.views import TokenObtainPairView




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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTasks(request):
  user = request.user
  tasks = Task.objects.filter(user = user)
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTodaysTasks(request):
  user = request.user
  due_date = date.today()
  tasks = Task.objects.filter(user = user, due_date= due_date)
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTomorrowsTasks(request):
  user = request.user
  due_date = date.today() + timedelta(days=1)
  tasks = Task.objects.filter(user = user, due_date= due_date)
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLaterTasks(request):
  user = request.user
  tomorrow = date.today() + timedelta(days=1)
  end_of_week = date.today() + timedelta(days=7)
  tasks = Task.objects.filter(user = user, due_date__range= [tomorrow, end_of_week])
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTask(request, pk):
  user = request.user
  try:
    task = Task.objects.get(id=pk, user= user)
  except Task.DoesNotExist:
    return Response({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
  serializer = TaskSerializer(task, many=False)
  
  return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    user = request.user
    data = request.data
    task = Task.objects.create(
        user=user,
        name=data['name'],
        description=data.get('description', ''),
        category=data.get('category', ''),
        due_date=data.get('due_date', None),
        is_completed=data.get('is_completed', False),
    )
    # set tags separately since it's ManyToManyField
    if 'tags' in data:
        task.tags.set(data['tags'])
    
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTask(request, pk):
  user = request.user
  try:
    task = Task.objects.get(id=pk, user= user)
  except Task.DoesNotExist:
    return Response({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
  serializer = TaskSerializer(task, data = request.data, many=False)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):
  user = request.user
  try:
    task = Task.objects.get(id=pk, user= user)
  except Task.DoesNotExist:
    return Response({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
  task.delete()
  return Response({'detail': 'Task deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTags(request):
  user = request.user
  tags = Tag.objects.filter(user=user)
  serializer = TagSerializer(tags, many=True)
  return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTag(request):
  user = request.user
  data = request.data
  if Tag.objects.filter(user=user).count() >= 10:
    return Response(
      {'detail': 'You have reached the maximum limit of 10 tags'},
      status = status.HTTP_400_BAD_REQUEST
    )
  tag = Tag.objects.create(
    user = user,
    name = data['name'],
    color = data['color']
  )
  serializer = TagSerializer(tag, many=False)
  return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTag(request, pk):
  user = request.user
  try:
    tag = Tag.objects.get(id=pk, user= user)
  except Tag.DoesNotExist:
    return Response({'detail': 'Tag not found'}, status=status.HTTP_404_NOT_FOUND)
  tag.delete()
  return Response({'detail': 'Tag deleted successfully'}, status=status.HTTP_200_OK)


