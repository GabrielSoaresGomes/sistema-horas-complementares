from django.contrib import admin
from .models import Activity, Course, ActivityCourse, UserActivity, UserCourse

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('__all__')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('__all__')

class ActivityCourseAdmin(admin.ModelAdmin):
    list_display = ('__all__')

class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('__all__')

class UserCourseAdmin(admin.ModelAdmin):
    list_display = ('__all__')

# Register your models here.
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(ActivityCourse, ActivityCourseAdmin)
admin.site.register(UserActivity, UserActivityAdmin)
admin.site.register(UserCourse, UserCourseAdmin)