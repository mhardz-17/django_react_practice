from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

import logging


class LoginView(KnoxLoginView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return super(LoginView, self).post(request, format=None)

  # def get_post_response_data(self, request, token, instance):
  #   UserSerializer = self.get_user_serializer_class()
  #
  #   data = {
  #     'expiry': self.format_expiry_datetime(instance.expiry),
  #     'token': token
  #   }
  #
  #   logging.info('test')
  #   if UserSerializer is not None:
  #     data["user"] = UserSerializer(
  #       request.user,
  #       context=self.get_context()
  #     ).data
  #   return data
