from django.db import models

# Create your models here.

class Usuarios(models.Model):
    rut_usuario = models.CharField(max_length=10)
    nombre_usuario = models.CharField(max_length=40)
    apellido_paterno = models.CharField(max_length=20)
    apellido_materno = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    email_academico = models.EmailField(unique=True)
    rol_usuario = models.CharField(max_length=30, blank=True)
    area_academica = models.CharField(max_length=30, blank=True)
            
    def __str__(self) -> str:
       
        return self.nombre_usuario