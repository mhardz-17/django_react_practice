from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, renderers, status  # add this
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.response import Response

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

  @action(detail=False)
  def test(self, request, *args, **kwargs):
    test = self.get_object()
    return Response(test)

  @action(detail=True)
  def set_completion(self, request, pk=None):
    todo = self.get_object()
    todo.completed = 1 if request.query_params['completed'] == '1' else 0
    todo.save();

    return Response({'status': 'success'})
