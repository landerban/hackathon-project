# gallery/urls.py
from django.urls import path
from .views import SaveGallery, SendGallery

urlpatterns = [
    path('api/save_gallery', SaveGallery.as_view(), name='gallery_list'),
    path('api/get_gallery/', SendGallery.as_view(), name='gallery'),
]
