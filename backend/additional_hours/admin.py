from django.contrib import admin
from .models import Activity, Course, ActivityCourse, UserActivity, UserCourse


admin.site.register(Activity)
admin.site.register(Course)
admin.site.register(ActivityCourse)
admin.site.register(UserActivity)
admin.site.register(UserCourse)
