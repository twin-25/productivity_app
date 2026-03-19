from rest_framework import serializers
from .models import Task, Tag, Subtask, User, StickyNote
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate




class TagSerializer(serializers.ModelSerializer):  
  class Meta:
    model = Tag
    fields = ['id', 'name', 'color', 'user']




class SubtaskSerializer(serializers.ModelSerializer):  
  class Meta:
    model = Subtask
    fields = ['id', 'description', 'is_completed', 'task']



class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model= User
    fields = ['id', 'username', 'email', 'is_staff']


class StickyNoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = StickyNote
    fields = ['id', 'title', 'description', 'color', 'user']
    read_only_fields = ['user']


class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only= True)

  def get_token(self, obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)
  
  class Meta:
    model = User
    fields = UserSerializer.Meta.fields + ['token']



class TaskSerializer(serializers.ModelSerializer):
  tags = TagSerializer(many = True, read_only= True)
  subtasks = SubtaskSerializer(many = True, read_only = True)
  user = serializers.SerializerMethodField(read_only = True)

  
  def get_user(self, obj):
    user = obj.user
    serializer = UserSerializer(user, many = False)
    return serializer.data
  
  class Meta:
    model = Task
    exclude = ['created_at', 'updated_at']

  


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  username_field = 'username'
  def validate(self, attrs):
    username_or_email = attrs.get('username')
    password = attrs.get('password')

    user = None
    try:
      user_obj = User.objects.get(email = username_or_email)
      user = authenticate(username = user_obj.username, password = password)
      if user:
        attrs['username'] = user_obj.username


    except User.DoesNotExist:
      user = authenticate(username = username_or_email, password=password)


    if not user:
      raise serializers.ValidationError('Invalid username/email or password')
      
    self.user = user

    data = super().validate(attrs)
    serializer = UserSerializerWithToken(self.user).data
    for k,v in serializer.items():
      data[k] = v

    return data

  