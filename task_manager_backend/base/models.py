from django.db import models
from django.conf import settings
from django.contrib.auth.models import User, AbstractUser
from colorfield.fields import ColorField
from django.utils import timezone


# Create your models here.

class User(AbstractUser):
  email = models.EmailField(max_length=254, unique=True)  # override to make email unique
  date_of_birth = models.DateField(null=True, blank=True)


class Tag(models.Model):
  name = models.CharField(max_length=20, blank=False)
  color=ColorField(default='#FF0000')
  created_at = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tags')

  def __str__(self):
    return str(self.name)

class Task(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  name = models.CharField(max_length=200, blank=True)
  description = models.TextField( null=True, blank=True)
  category = models.CharField(max_length= 100, null = True, blank = True)
  created_at = models.DateTimeField(auto_now_add=True)
  is_completed = models.BooleanField(default=False)
  tags = models.ManyToManyField(Tag, blank=True)
  updated_at = models.DateTimeField(auto_now=True)
  due_date = models.DateField(blank=True, null=True)

  def __str__(self):
    return str(self.name)


class Subtask (models.Model):
  description = models.TextField(blank=True, null = True)
  task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks')
  is_completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return str(self.description)


class StickyNote(models.Model):
  title = models.CharField(max_length=100, blank = False)
  description = models.TextField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  color = ColorField(default='#FFFF00')
  updated_at = models.DateTimeField(auto_now=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='stickynote')

  def __str__(self):
    return str(self.title)

class CalendarEvent(models.Model):
  title = models.CharField(max_length=300)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='calendar_event')
  created_at = models.DateTimeField(auto_now_add=True)
  start_date = models.DateTimeField(default=timezone.now)
  end_date = models.DateTimeField(null=True, blank=True)
  updated_at = models.DateTimeField(auto_now=True)


  def __str__(self):
    return str(self.title)




