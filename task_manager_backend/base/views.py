from django.shortcuts import render
from django.http import JsonResponse

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
