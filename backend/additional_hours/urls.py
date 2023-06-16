from django.urls import path

from .views import activity_view, course_view, activity_course_view, user_activity_view
from . import old_views

urlpatterns = [
    path('activity/', activity_view.insert_list_activity, name='activities'),
    path('activity/<int:pk>/', activity_view.detail_remove_update_activity),
    path('course/', course_view.insert_list_course, name='courses'),
    path('course/<int:pk>/', course_view.detail_remove_update_course),
    path('activitycourse/', activity_course_view.insert_list_activity_course),
    path('activitycourse/<int:pk>/', activity_course_view.detail_remove_update_activity_course),

    path('usercourse/', old_views.insert_list_user_course),
    path('usercourse/<int:pk>/', old_views.detail_remove_update_user_course),

    path('useractivity/', user_activity_view.insert_list_user_activity),
    path('useractivity/<int:pk>/', user_activity_view.detail_remove_update_user_activity),
    path('useractivity/<int:pk>/file/', user_activity_view.append_file_to_user_activity),
]
