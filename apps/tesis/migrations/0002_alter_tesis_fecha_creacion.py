# Generated by Django 4.2.2 on 2023-11-25 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tesis', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tesis',
            name='fecha_creacion',
            field=models.DateField(null=True),
        ),
    ]