# Generated by Django 2.1.1 on 2018-09-21 10:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dp', models.ImageField(blank=True, null=True, upload_to='dps/')),
                ('dob', models.DateField(blank=True, null=True)),
                ('member_since', models.DateTimeField(default=django.utils.timezone.now)),
                ('contact_list', models.ManyToManyField(blank=True, related_name='contacters', to=settings.AUTH_USER_MODEL)),
                ('followers', models.ManyToManyField(blank=True, related_name='following', to=settings.AUTH_USER_MODEL)),
                ('pending_list', models.ManyToManyField(blank=True, related_name='my_pending_requests', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-member_since',),
            },
        ),
    ]
