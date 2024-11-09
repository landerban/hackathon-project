from rest_framework import serializers
from .models import Pixels,Canvas


class PixelsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Pixels
        exclude=()
class CanvasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Canvas
        