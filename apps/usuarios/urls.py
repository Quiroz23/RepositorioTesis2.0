from django.urls import path, include
from rest_framework.documentation import include_docs_urls # - Crea la documentacion de la api 
from rest_framework import routers # - Es una herramienta proporcionada por Django REST framework que facilita la creación de rutas para vistas basadas en clases
from .views import *

router = routers.DefaultRouter() # - Este enrutador se utiliza para generar automáticamente rutas (URLs) basadas en las vistas que deseas exponer en tu API
router.register(r'usuarios', UsersView, 'user' )

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title='Repositorio API'))
]