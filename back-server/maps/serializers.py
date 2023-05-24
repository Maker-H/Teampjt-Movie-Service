from rest_framework import serializers
from .models import Map

class MapListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Map
        fields = '__all__'