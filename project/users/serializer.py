from rest_framework import serializers
from .models import User
from gallery.models import Gallery


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    galleries = GallerySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'galleries']
