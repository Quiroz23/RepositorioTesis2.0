from django.db import models
from apps.usuarios.models import Usuarios
from apps.tesis.models import Tesis

# Create your models here.

class DetalleTesis(models.Model):
    ESTADO_CHOICES =[
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
        ('enEspera', 'En Espera'),
        ]
    id_Usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    id_tesis = models.ForeignKey(Tesis, on_delete=models.CASCADE)
    titulo_tesis= models.CharField(max_length=255)
    nombre_autor = models.CharField(max_length=255)
    fecha_creacion = models.DateField(auto_now_add= True, blank=True)
    #Visualizacion de profesora para evaluar y marcar aprovado o rechazado 
    mensaje = models.TextField(blank=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='enEspera', blank=True)


    def __str__(self) -> str:
       
        return self.nombre_autor
