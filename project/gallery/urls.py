# gallery/urls.py
from django.urls import path
from .views import SaveGallery, SendGallery

urlpatterns = [
    path('api/upload/', SaveGallery.as_view(), name='gallery_list'),
    path('api/get-gallery/', SendGallery.as_view(), name='gallery'),
]
