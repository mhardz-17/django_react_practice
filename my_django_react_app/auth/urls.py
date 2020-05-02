from knox import views as knox_views
from .views import LoginView,UserAPI
from django.urls import path, include

urlpatterns = [
  path(r'api/auth/login/', LoginView.as_view(), name='knox_login'),
  path(r'api/auth/user', UserAPI.as_view(), name='user_info'),
  path('api/auth', include('knox.urls')),
  # url(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
  # url(r'logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
