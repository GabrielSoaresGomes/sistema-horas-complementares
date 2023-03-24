from django.db import models
from users.models import User


class Activity(models.Model):
    class Admin:
        pass
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    description = models.TextField(blank=False, null=False, verbose_name='Descrição')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'activity'


class Course(models.Model):
    class Admin:
        pass
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'course'


class ActivityCourse(models.Model):
    class Admin:
        pass
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, verbose_name='Curso', null=True)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, verbose_name='Atividade', null=True)
    maximun_hours = models.IntegerField(default=0, verbose_name='Máximo de Horas')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'activity_course'


class UserActivity(models.Model):
    class Admin:
        pass
    user = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Usuário', null=True)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, verbose_name='Atividade', null=True)
    quantity = models.IntegerField(verbose_name='Quantidade', default=0)
    hours_acc = models.IntegerField(verbose_name='Horas ACC', default=0)
    total_hours = models.IntegerField(verbose_name='Horas Totais', default=0)
    is_valid = models.BooleanField(verbose_name='É válido')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'user_activity'


class UserCourse(models.Model):
    class Admin:
        pass
    user = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Usuário', null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, verbose_name='Curso', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'user_course'
