from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import ActivityCourse, Activity, Course
from additional_hours.serializers import ActivitySerializer, CourseSerializer


class ActivityCourseSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(allow_null=True, required=False)
    activity_id = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = ActivityCourse
        fields = ('id', 'activity_id', 'course_id', 'maximum_hours', 'created_at', 'deleted_at')
