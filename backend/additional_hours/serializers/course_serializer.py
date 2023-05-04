from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'code', 'created_at', 'deleted_at')
        