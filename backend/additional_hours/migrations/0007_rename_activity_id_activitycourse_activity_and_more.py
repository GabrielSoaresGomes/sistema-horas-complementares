# Generated by Django 4.1.7 on 2023-04-21 06:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('additional_hours', '0006_rename_activity_activitycourse_activity_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='activitycourse',
            old_name='activity_id',
            new_name='activity',
        ),
        migrations.RenameField(
            model_name='activitycourse',
            old_name='course_id',
            new_name='course',
        ),
    ]