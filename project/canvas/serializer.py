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
        exclude=()
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
