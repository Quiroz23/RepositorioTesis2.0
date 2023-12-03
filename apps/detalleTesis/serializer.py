from rest_framework import serializers
from .models import DetalleTesis

class DetallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleTesis
        fields = '__all__'