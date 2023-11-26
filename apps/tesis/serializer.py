from rest_framework import serializers
from .models import Tesis

class TesisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tesis
        fields = '__all__'