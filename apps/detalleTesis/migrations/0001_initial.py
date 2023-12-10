# Generated by Django 4.2.6 on 2023-12-10 21:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0001_initial'),
        ('tesis', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DetalleTesis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo_tesis', models.CharField(max_length=255)),
                ('nombre_autor', models.CharField(max_length=255)),
                ('fecha_creacion', models.DateField(auto_now_add=True)),
                ('mensaje', models.TextField(blank=True)),
                ('estado', models.CharField(blank=True, choices=[('aprobado', 'Aprobado'), ('rechazado', 'Rechazado'), ('enEspera', 'En Espera')], default='enEspera', max_length=10)),
                ('id_Usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuarios')),
                ('id_tesis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tesis.tesis')),
            ],
        ),
    ]
