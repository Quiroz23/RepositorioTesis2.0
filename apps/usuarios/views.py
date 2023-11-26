from rest_framework import viewsets
from .serializer import UserSerializer
from .models import Usuarios

# - Create your views here.

# - CRUD para los Users 

class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Usuarios.objects.all()