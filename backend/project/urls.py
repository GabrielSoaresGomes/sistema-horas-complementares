from django.contrib import admin
from django.urls import path, include
from .views import APIRootView


urlpatterns = [
    path('', APIRootView.as_view(), name='api-root'),
    path('users/', include('users.urls')),
    path('additional_hours/', include('additional_hours.urls')),
    path('admin/', admin.site.urls),
]
