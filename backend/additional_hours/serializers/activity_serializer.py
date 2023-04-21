from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'name', 'description', 'created_at', 'deleted_at')
        