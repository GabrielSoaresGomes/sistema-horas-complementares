from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import ActivityCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityCourse
        fields = ('id', 'course', 'activity', 'maximum_hours', 'created_at', 'deleted_at')
