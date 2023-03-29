from datetime import datetime
from django.db import models
from users.models import User


class BaseManager(models.Manager):
    def get_all_not_deleted(self):
        result = super().get_queryset().filter(deleted_at=None).values()
        return {"result": result, "success": True, "message": ""}

    def get_all(self):
        return super().get_queryset().values()

    def get_not_deleted_by_pk(self, pk):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None).values()
        if len(result) > 0:
            return {"result": result[0], "success": True, "message": ""}
        return {"result": "", "success": False, "message": "Não foi possível achar um resultado!"}

    def delete_by_pk(self, pk):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = activity[0]
            result.deleted_at = datetime.now()
            result.save()
            return {"success": True, "message": "Deletado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}

    def update_by_pk(self, pk, name, description):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(activity) > 0:
            result = result[0]
            result.name = name
            result.description = description
            result.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}

class ActivityManager(models.Manager):
    def get_all_activities_not_deleted(self):
        return super().get_queryset().filter(deleted_at=None).values()

    def get_all_activities(self):
        return super().get_queryset().values()

    def get_activity_not_deleted_by_pk(self, pk):
        activity = super().get_queryset().filter(pk=pk).filter(deleted_at=None).values()
        if len(activity) > 0:
            return activity[0]
        return {}

    def delete_activity_by_pk(self, pk):
        activity = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(activity) > 0:
            activity = activity[0]
            activity.deleted_at = datetime.now()
            activity.save()
            return {"success": True, "message": "Deletado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhuma atividade com essa pk!"}

    def update_activity_by_pk(self, pk, name, description):
        activity = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(activity) > 0:
            activity = activity[0]
            activity.name = name
            activity.description = description
            activity.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhuma atividade com essa pk!"}



class Activity(models.Model):
    class Admin:
        pass
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    description = models.TextField(blank=False, null=False, verbose_name='Descrição')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = ActivityManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'activity'


class CourseManager(BaseManager):
    pass

class Course(models.Model):
    class Admin:
        pass
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    code = models.TextField(blank=False, null=False, verbose_name='Code')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = CourseManager()

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
