from django.db import models
from users.models import User


class Activity(models.Model):
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    description = models.TextField(blank=False, null=False, verbose_name='Descrição')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'activity'


class Course(models.Model):
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'course'


class ActivityCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING, verbose_name='Curso')
    activity = models.ForeignKey(Activity, on_delete=models.DO_NOTHING, verbose_name='Atividade')
    maximun_hours = models.IntegerField(default=0, verbose_name='Máximo de Horas')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'activity_course'


class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name='Usuário')
    activity = models.ForeignKey(Activity, on_delete=models.DO_NOTHING, verbose_name='Atividade')
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
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name='Usuário')
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING, verbose_name='Curso')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'user_course'



