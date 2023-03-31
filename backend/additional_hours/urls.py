from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.insert_list_activity),
    path('activity/<int:pk>', views.detail_remove_update_activity),
    path('course/', views.insert_list_course),
    path('course/<int:pk>', views.detail_remove_update_course),
    path('activitycourse/', views.insert_list_activity_course),
    path('activitycourse/<int:pk>', views.detail_remove_update_activity_course),
    path('usercourse/', views.insert_list_user_course),
    path('usercourse/<int:pk>', views.detail_remove_update_user_course),
    path('useractivity/', views.insert_list_user_activity),
    path('useractivity/<int:pk>', views.detail_remove_update_user_activity),
]
