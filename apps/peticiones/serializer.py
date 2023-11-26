from rest_framework import serializers
from .models import Peticiones

class PeticionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peticiones
        fields = '__all__'
