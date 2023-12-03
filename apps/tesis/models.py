from django.db import models
from ..usuarios.models import Usuarios

# Create your models here.

class Tesis(models.Model):
    id_usuario = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, related_name= 'id_u')
    nombre_usuario = models.CharField(max_length=100, null=True)
    apellido_paterno = models.CharField(max_length=100, null=True)
    email_academico = models.CharField(max_length=100, null=True) 
    titulo_tesis = models.CharField(max_length=100, )
    fecha_creacion = models.DateField(null=True)
    archivo = models.FileField(blank=True, null=True)
    area_academica = models.CharField(max_length=100, null=True)
    clave_encriptacion = models.CharField(max_length=255, blank=True, null=True)
           
    def __str__(self) -> str:
        return self.titulo_tesis


