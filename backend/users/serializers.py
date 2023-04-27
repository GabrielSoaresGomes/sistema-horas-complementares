from rest_framework import serializers
from .models import User


class UserListDetailSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    course_id = serializers.CharField(source='course.id', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'last_login', 'name', 'email', 'is_admin', 'is_active', 'registration', 'created_at',
                  'course_name', 'course_id']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
                    'name',
                    'email',
                    'registration',
                    # 'password'
                  ]
        # extra_kwargs = {
        #     'password': {'write_only': True}
        # }

    def save(self):
        user = User(name=self.validated_data.get('name'),email=self.validated_data.get('email'), registration=self.validated_data.get('registration'))
        password = self.validated_data.get('password')
        if not password:
            password = '12345678'
        user.set_password(password)
        user.save()
        return user


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Senhas são diferentes.'})
        return value
		