from django.contrib import admin
from .models import Activity, Course, ActivityCourse, UserActivity, UserCourse

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'deleted_at')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'created_at', 'deleted_at')

class ActivityCourseAdmin(admin.ModelAdmin):
    list_display = ('course', 'activity', 'maximum_hours', 'created_at', 'deleted_at')

class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity', 'quantity', 'hours_acc', 'total_hours', 'is_valid', 'created_at', 'deleted_at')

class UserCourseAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'created_at', 'deleted_at')

# Register your models here.
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(ActivityCourse, ActivityCourseAdmin)
admin.site.register(UserActivity, UserActivityAdmin)
admin.site.register(UserCourse, UserCourseAdmin)
