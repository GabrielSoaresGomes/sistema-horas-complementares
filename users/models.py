import datetime

from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.utils import timezone


class UserManager(BaseUserManager):

    def create_user(self, email, registration, password=None):
        if not email:
            raise ValueError('Usuários precisam fornecer um email')

        user = self.model(
            email=self.normalize_email(email),
            registration=registration
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, registration, password=None):
        user = self.create_user(
            email,
            password=password,
            registration=registration
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


# Utilização da classe TimeStampMixin para criação automática das colunas created_at e deleted_at
class User(AbstractBaseUser):
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    email = models.EmailField(
        max_length=255,
        unique=True,
        verbose_name='Email'
    )
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    expiry_date = models.DateTimeField(null=True, blank=True)
    registration = models.TextField(blank=False, null=False, verbose_name='Matrícula')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'registration']

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'user'
    