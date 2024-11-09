# gallery/views.py
import base64
import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Gallery
from users.models import User
from .serializer import GallerySerializer


class SaveGallery(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        user = User.objects.filter(username=username).first()

        if user and user.is_superuser:
            serializer = GallerySerializer(
                data={'image': request.data.get('image')})
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Image uploaded successfully!'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Unauthorized or invalid username.'}, status=status.HTTP_403_FORBIDDEN)


class SendGallery(APIView):
    def get(self, request):
        images = Gallery.objects.all()
        image_list = []
        for img in images:
            image_list.append({
                "id": img.id,
                "image": img.image.url  # Use the image URL directly
            })
        return JsonResponse({"images": image_list})
