from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import ActivityCourse


class ActivityCourseSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(allow_null=True, required=False)
    course_name = serializers.CharField(source='course.name', read_only=True)
    activity_description = serializers.CharField(source='activity.description', read_only=True)
    activity_name = serializers.CharField(source='activity.name', read_only=True)
    activity_id = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = ActivityCourse
        fields = ('id', 'activity_id', 'course_id', 'maximum_hours', 'created_at', 'activity_name',
                  'activity_description', 'deleted_at', 'course_name')
