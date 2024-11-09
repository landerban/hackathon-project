# gallery/views.py
import base64
import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Gallery
from .serializer import GallerySerializer


class SaveGallery(APIView):
    def post(self, request, format=None):
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
