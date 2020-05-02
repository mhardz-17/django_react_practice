from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login

from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from .serializers import UserSerializer

import logging


class LoginView(KnoxLoginView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return super(LoginView, self).post(request, format=None)


class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
