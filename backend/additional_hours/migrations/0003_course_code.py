# Generated by Django 4.1.7 on 2023-03-29 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('additional_hours', '0002_alter_activitycourse_activity_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='code',
            field=models.TextField(default='', verbose_name='Code'),
            preserve_default=False,
        ),
    ]