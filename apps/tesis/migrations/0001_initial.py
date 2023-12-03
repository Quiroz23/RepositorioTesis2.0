# Generated by Django 4.2.6 on 2023-11-19 00:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tesis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_usuario', models.CharField(max_length=100, null=True)),
                ('apellido_paterno', models.CharField(max_length=100, null=True)),
                ('email_academico', models.CharField(max_length=100, null=True)),
                ('titulo_tesis', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateField(null=True, unique=True)),
                ('archivo', models.FileField(blank=True, null=True, upload_to='')),
                ('area_academica', models.CharField(max_length=100, null=True)),
                ('id_usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='id_u', to='usuarios.usuarios')),
            ],
        ),
    ]