# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
  email = models.TextField(max_length=200, blank=False)
