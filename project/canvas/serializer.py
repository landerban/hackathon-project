from rest_framework import serializers
from .models import Pixels


class PixelsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Pixels
        exclude=()
