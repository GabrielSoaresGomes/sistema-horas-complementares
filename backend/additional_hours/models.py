import base64
import os
import datetime
from django.db import models
from django.apps import apps
from storages.backends.gcloud import GoogleCloudStorage

from users.models import User

storage = GoogleCloudStorage()


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

    def get_instance_not_deleted_by_pk(self, pk):
        result = super().get_queryset().get(pk=pk, deleted_at=None)
        if result:
            return {"result": result, "success": True, "message": ""}
        return {"result": "", "success": False, "message": "Não foi possível achar um resultado!"}

    def delete_by_pk(self, pk):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = result[0]
            result.deleted_at = datetime.datetime.now()
            result.save()
            return {"success": True, "message": "Deletado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}


class ActivityManager(models.Manager):
    def get_all_activities_not_deleted(self):
        return super().get_queryset().filter(deleted_at=None).values()

    def get_all_activities(self):
        return super().get_queryset().values()

    def get_activity_not_deleted_by_pk(self, pk):
        activity = super().get_queryset().filter(pk=pk).filter(deleted_at=None).values()
        if len(activity) > 0:
            return {"result": activity[0], "success": True, "message": ""}
        return {"result": "", "success": False, "message": "Não foi possível achar um resultado com a PK fornecida!"}

    def delete_activity_by_pk(self, pk):
        activity = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(activity) > 0:
            activity = activity[0]
            activity.deleted_at = datetime.datetime.now()
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

    def get_instance_not_deleted_by_pk(self, pk):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            return {"result": result[0], "success": True, "message": ""}
        return {"result": "", "success": False, "message": "Não foi possível achar um resultado!"}


class CourseManager(BaseManager):
    def update_by_pk(self, pk, name, code):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = result[0]
            result.name = name
            result.code = code
            result.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}


class ActivityCourseManager(BaseManager):
    def insert_new_activity_course(self, data):
        course_id = data['course_id']
        activity_id = data['activity_id']
        maximum_hours = data['maximum_hours']
        if not course_id or not activity_id or not maximum_hours:
            return None
        activity = Activity.objects.get_instance_not_deleted_by_pk(activity_id)
        course = Course.objects.get_instance_not_deleted_by_pk(course_id)
        activity_course = ActivityCourse(course=course, activity=activity, maximum_hours=maximum_hours)
        activity_course.save()
        return activity_course.id

    def list_not_deleted_by_query(self, query_params=None):
        result = super().get_queryset().filter(deleted_at=None)
        if query_params.get('course_id'):
            result = result.filter(course_id=query_params.get('course_id'))
        if query_params.get('activity_id'):
            result = result.filter(activity_id=query_params.get('activity_id'))
        result = result.values()
        return {"result": result, "success": True, "message": ""}

    def update_by_pk(self, pk, course_id, activity_id, maximum_hours):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = result[0]
            result.course_id = course_id
            result.activity_id = activity_id
            result.maximum_hours = maximum_hours
            result.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}


class UserCourseManager(BaseManager):

    def insert_new_user_course(self, data):
        course_id = data['course_id']
        user_id = data['user_id']
        if not course_id or not user_id:
            return None
        user = User.objects.get_instance_not_deleted_by_pk(user_id)
        course = Course.objects.get_instance_not_deleted_by_pk(course_id)
        user_course = UserCourse(course=course, user=user)
        user_course.save()
        return user_course.id

    def list_not_deleted_by_query(self, query):
        result = super().get_queryset().filter(deleted_at=None)
        if query.get('course_id'):
            result = result.filter(course_id=query.get('course_id'))
        if query.get('user_id'):
            result = result.filter(user_id=query.get('user_id'))
        result = result.values()
        return {"result": result, "success": True, "message": ""}

    def update_by_pk(self, pk, course_id, user_id):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = result[0]
            result.course_id = course_id
            result.user_id = user_id
            result.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}


class UserActivityManager(BaseManager):

    def insert_new_user_activity(self, data):
        user_id = data['user_id']
        activity_id = data['activity_id']
        quantity = data['quantity']
        hours_acc = data['hours_acc']
        total_hours = data['total_hours']
        is_valid = data['is_valid']

        if not activity_id or not user_id:
            return None
        user = User.objects.get_instance_not_deleted_by_pk(user_id)
        activity = Activity.objects.get_instance_not_deleted_by_pk(activity_id)
        user_course = UserActivity(activity=activity, user=user, quantity=quantity, hours_acc=hours_acc,
                                   total_hours=total_hours, is_valid=is_valid)
        user_course.save()
        return user_course.id

    def list_not_deleted_by_query(self, query):
        result = super().get_queryset().filter(deleted_at=None)
        if query.get('activity_id'):
            result = result.filter(activity_id=query.get('activity_id'))
        if query.get('user_id'):
            result = result.filter(user_id=query.get('user_id'))
        result = result.values()
        return {"result": result, "success": True, "message": ""}

    def update_by_pk(self, pk, data):
        result = super().get_queryset().filter(pk=pk).filter(deleted_at=None)
        if len(result) > 0:
            result = result[0]
            result.activity_id = data['activity_id']
            result.user_id = data['user_id']
            result.quantity = data['quantity']
            result.hours_acc = data['hours_acc']
            result.total_hours = data['total_hours']
            result.is_valid = data['is_valid']
            result.save()
            return {"success": True, "message": "Atualizado com sucesso"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}

    def append_file(self, pk, file_uploaded):
        UserActivity = apps.get_model('additional_hours', 'UserActivity')
        user_activity_object = UserActivity.objects.get(pk=pk, deleted_at=None)
        if user_activity_object:
            old_file_name, extension = os.path.splitext(file_uploaded.name)

            full_datetime_now = datetime.datetime.now()
            year_now = str(full_datetime_now.year)
            month_now = str(full_datetime_now.month)
            day_now = str(full_datetime_now.day)
            filename = f'user_activty_id={user_activity_object.id}{extension}'
            target_path = os.path.join('comprovantes', year_now, month_now, day_now, filename)
            path = storage.save(target_path, file_uploaded)
            url_file = storage.url(path)
            user_activity_object.file = url_file
            user_activity_object.save()
            return {"success": True, "message": "Arquivo inserido com sucesso!"}
        return {"success": False, "message": "Não foi encontrado nenhum resultado com essa pk!"}


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
    maximum_hours = models.IntegerField(default=0, verbose_name='Máximo de Horas')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = ActivityCourseManager()

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'activity_course'


class UserActivity(models.Model):
    class Admin:
        pass
    user = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Usuário', null=True)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, verbose_name='Atividade', null=True)
    file = models.TextField(null=True, verbose_name="Arquivo")
    quantity = models.IntegerField(verbose_name='Quantidade', default=0)
    hours_acc = models.IntegerField(verbose_name='Horas ACC', default=0)
    total_hours = models.IntegerField(verbose_name='Horas Totais', default=0)
    is_valid = models.BooleanField(verbose_name='É válido', default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = UserActivityManager()

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

    objects = UserCourseManager()

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'user_course'
