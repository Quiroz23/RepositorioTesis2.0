from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PyPDF2 import PdfReader
from cryptography.fernet import Fernet
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.exceptions import SuspiciousFileOperation, ValidationError
from rest_framework.exceptions import APIException
from .models import Tesis
from ..usuarios.models import Usuarios
from .serializer import TesisSerializer
from datetime import datetime
from django.conf import settings
from django.http import HttpResponse
from django.http import HttpResponseServerError

class TesisView(viewsets.ModelViewSet):
    serializer_class = TesisSerializer
    queryset = Tesis.objects.all()

    @parser_classes([MultiPartParser])
    def create_with_file(self, request, *args, **kwargs):
        try:
            archivo = request.FILES.get('archivo')

            if archivo is None:
                raise APIException(detail="El archivo no fue proporcionado.", code=status.HTTP_400_BAD_REQUEST)

            # Lógica de encriptación del archivo
            key = Fernet.generate_key()
            cipher_suite = Fernet(key)
            encrypted_data = cipher_suite.encrypt(archivo.read())

            # Crear un nuevo archivo encriptado para almacenar en el modelo
            encrypted_file = ContentFile(encrypted_data, name=archivo.name)

            titulo_tesis = request.data.get('titulo_tesis')
            area_academica = request.data.get('area_academica')
            id_usuario = request.data.get('id_usuario')

            if id_usuario == '':
                id_usuario = None
            else:
                try:
                    id_usuario = int(id_usuario)
                except (TypeError, ValueError):
                    id_usuario = None

            if id_usuario is not None:
                id_usuario_instance = Usuarios.objects.get(id=id_usuario)
            else:
                id_usuario_instance = None

            nombre_usuario = request.data.get('nombre_usuario')
            apellido_paterno = request.data.get('apellido_paterno')
            email_academico = request.data.get('email_academico')

            # Asegúrate de que la fecha tenga el formato correcto (YYYY-MM-DD)
            fecha_creacion = request.data.get('fecha_creacion')
            try:
                if fecha_creacion:
                    fecha_creacion = datetime.strptime(fecha_creacion, '%Y-%m-%d').date()
            except ValueError:
                raise ValidationError("Formato de fecha no válido. Debe estar en formato YYYY-MM-DD.")

            # Asignar la clave al campo correspondiente en el modelo Tesis
            nueva_tesis = Tesis(
                archivo=encrypted_file,  # Usar el archivo encriptado
                clave_encriptacion=key.decode(),  # Almacenar la clave en el modelo
                titulo_tesis=titulo_tesis,
                area_academica=area_academica,
                id_usuario=id_usuario_instance,
                nombre_usuario=nombre_usuario,
                apellido_paterno=apellido_paterno,
                email_academico=email_academico,
                fecha_creacion=fecha_creacion,
            )
            nueva_tesis.save()

            # Guardar el archivo en el sistema de archivos de Django
            file_path = default_storage.save(archivo.name, encrypted_file)

            print("Ruta del archivo guardado:", file_path)  # Añadido para imprimir la ruta
            
            response_data = {
                'key': key.decode(),  # Convertir la clave a una cadena antes de enviarla
                'encrypted_file': encrypted_data,
            }

            return Response({'id': nueva_tesis.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            raise APIException(detail=str(e), code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        if 'archivo' in request.FILES:
            return self.create_with_file(request, *args, **kwargs)
        else:
            return super().create(request, *args, **kwargs)
        
    def desencriptar_tesis(request, id_tesis):
        try:
            tesis = Tesis.objects.get(id=id_tesis)
            
            if not tesis.archivo:
                return HttpResponse("Archivo no encontrado", status=404)
            
            clave_encriptacion = tesis.clave_encriptacion  # Obtener la clave desde el modelo
            cipher_suite = Fernet(clave_encriptacion)

            with open(tesis.archivo.path, 'rb') as f:
                contenido_encriptado = f.read()
                contenido_desencriptado = cipher_suite.decrypt(contenido_encriptado)

            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="{tesis.archivo.name}"'
            response.write(contenido_desencriptado)

            return response
        except Exception as e:
            return HttpResponseServerError(f"Error al desencriptar la tesis: {str(e)}")
