from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TesisSerializer
from ..usuarios.models import Usuarios
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Tesis
from rest_framework.exceptions import APIException


# - CRUD para las Tesis

class TesisView(viewsets.ModelViewSet):
    serializer_class = TesisSerializer
    queryset = Tesis.objects.all()
    
    
    def create_with_file(self, request, *args, **kwargs):
        try:
            archivo = request.FILES.get('archivo')
            titulo_tesis = request.data.get('titulo_tesis')
            area_academica = request.data.get('area_academica')
            id_usuario = request.data.get('id_usuario')
            
            if id_usuario is not None and id_usuario != 'undefined':
                id_usuario_instance = Usuarios.objects.get(id=id_usuario)
            else:
                id_usuario_instance = None
            nombre_usuario = request.data.get('nombre_usuario')
            apellido_paterno = request.data.get('apellido_paterno')
            email_academico = request.data.get('email_academico')
            fecha_creacion = request.data.get('fecha_creacion')


            nueva_tesis = Tesis(
                archivo=archivo,
                titulo_tesis=titulo_tesis,
                area_academica=area_academica,
                id_usuario=id_usuario_instance,
                nombre_usuario=nombre_usuario,
                apellido_paterno=apellido_paterno,
                email_academico=email_academico,
                fecha_creacion=fecha_creacion,
                
                # Otros campos
            )
            nueva_tesis.save()

            serializer = TesisSerializer(nueva_tesis)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
       
            raise APIException(detail=str(e), code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        # Determina si la solicitud es para la carga de archivos o para la creación regular
        if 'archivo' in request.FILES:
            return self.create_with_file(request, *args, **kwargs)
        else:
            return super().create(request, *args, **kwargs)