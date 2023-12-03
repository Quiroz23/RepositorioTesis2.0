from rest_framework import viewsets
from .serializer import DetallesSerializer
from .models import DetalleTesis

# Create your views here.

class DetalleView(viewsets.ModelViewSet):
    serializer_class = DetallesSerializer
    queryset = DetalleTesis.objects.all()
