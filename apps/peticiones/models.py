from django.db import models
from apps.usuarios.models import Usuarios
from apps.tesis.models import Tesis

# Create your models here.

class Peticiones(models.Model):
    ESTADO_CHOICES = [
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
        ('enEspera', 'En Espera'),
    ]
    id_Usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    id_tesis = models.ForeignKey(Tesis, on_delete=models.CASCADE)
    nombre_tesis = models.CharField(max_length=255)
    nombre_usuario = models.CharField(max_length=255)
    mensaje = models.TextField(blank=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='enEspera', blank=True)
    fecha_creacion = models.DateField(auto_now_add=True, blank=True)
    
            
    def __str__(self) -> str:
       
        return self.nombre_usuario
