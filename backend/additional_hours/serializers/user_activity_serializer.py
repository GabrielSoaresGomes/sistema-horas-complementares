from django.db.models import fields
from rest_framework import serializers

from additional_hours.models import UserActivity


class UserActivitySerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(allow_null=True, required=False)
    activity_id = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = UserActivity
        fields = ('id', 'activity_id', 'user_id', 'quantity', 'hours_acc', 'total_hours', 'file',
                  'is_valid', 'created_at', 'deleted_at')
