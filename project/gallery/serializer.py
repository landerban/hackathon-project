# gallery/serializers.py
from rest_framework import serializers
from .models import Gallery


class GallerySerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Gallery
        fields = '__all__'
