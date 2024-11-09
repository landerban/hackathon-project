# gallery/urls.py
from django.urls import path
from .views import GalleryList, GalleryAPIView

urlpatterns = [
    path('gallery/', GalleryList.as_view(), name='gallery_list'),
    path('api/gallery/', GalleryAPIView.as_view(), name='gallery'),
]
