from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.insert_list_activity),
    path('activity/<int:pk>', views.detail_remove_update_activity),
    path('course/', views.insert_list_course),
    path('course/<int:pk>', views.detail_remove_update_course),
]
