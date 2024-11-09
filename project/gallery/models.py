# gallery/models.py
from django.db import models


class Gallery(models.Model):
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description if self.description else 'No description'
