from django.db import models


# Utilização da classe TimeStampMixin para criação automática das colunas created_at e deleted_at
class User(models.Model):
    name = models.TextField(blank=False, null=False, verbose_name='Nome')
    registration = models.TextField(blank=False, null=False, verbose_name='Matrícula')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name


    class Meta:
        db_table = 'user'
    