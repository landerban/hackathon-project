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


class GalleryList(APIView):
    def post(self, request, format=None):
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryAPIView(APIView):
    def get(self, request):
        images = Gallery.objects.all()
        image_list = []
        for image in images:
            image_path = os.path.join(
                settings.MEDIA_ROOT, 'gallery', image.file.name)
            with open(image_path, "rb") as image_file:
                encoded_string = base64.b64encode(
                    image_file.read()).decode("utf-8")
                image_list.append({"id": image.id,
                                   "title": image.title,
                                  "image": f"data:image/jpeg;base64,{encoded_string}"})
        return JsonResponse({"images": image_list})
