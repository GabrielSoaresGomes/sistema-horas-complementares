from django.urls import path

from .views import activity_view
from . import old_views

urlpatterns = [
    path('activity/', activity_view.insert_list_activity),
    path('activity/<int:pk>/', activity_view.detail_remove_update_activity),

    path('course/', old_views.insert_list_course),
    path('course/<int:pk>/', old_views.detail_remove_update_course),
    path('activitycourse/', old_views.insert_list_activity_course),
    path('activitycourse/<int:pk>/', old_views.detail_remove_update_activity_course),
    path('usercourse/', old_views.insert_list_user_course),
    path('usercourse/<int:pk>/', old_views.detail_remove_update_user_course),
    path('useractivity/', old_views.insert_list_user_activity),
    path('useractivity/<int:pk>/', old_views.detail_remove_update_user_activity),
    path('useractivity/<int:pk>/file/', old_views.append_file_to_user_activity),
]
