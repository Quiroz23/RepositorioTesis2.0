from rest_framework import viewsets
from .serializer import PeticionesSerializer
from .models import Peticiones

# Create your views here.

class PeticionesView(viewsets.ModelViewSet):
    serializer_class = PeticionesSerializer
    queryset = Peticiones.objects.all()
