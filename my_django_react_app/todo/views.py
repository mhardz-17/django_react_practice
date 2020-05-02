from django.shortcuts import render


# Create your views here.
from rest_framework import viewsets, permissions  # add this
from .serializers import TodoSerializer  # add this
from .models import Todo  # add this


class TodoView(viewsets.ModelViewSet):  # add this
  serializer_class = TodoSerializer  # add this
  # queryset = Todo.objects.all()

  permission_classes = [
    permissions.IsAuthenticated,
  ]

  def get_queryset(self):
    return self.request.user.todos.all()

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
