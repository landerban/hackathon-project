# gallery/urls.py
from django.urls import path
from .views import SaveGallery, SendGalley

urlpatterns = [
    path('api/save_gallery', SaveGallery.as_view(), name='gallery_list'),
    path('api/get_gallery/', SendGalley.as_view(), name='gallery'),
]
