# gallery/urls.py
from django.urls import path
from .views import GalleryList

urlpatterns = [
    path('gallery/', GalleryList.as_view(), name='gallery_list'),
]
