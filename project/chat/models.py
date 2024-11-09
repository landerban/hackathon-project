from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.


class Chat(models.Model):
    message = models.TextField()
    timestamp = models.DateTimeField(
        auto_now_add=True,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None,
    )
    room_name = models.CharField(
        max_length=15,
        default=timezone.now().strftime('%Y-%m-%d'),
        editable=False,
    )

    def __str__(self):
        return f'{self.author}: {self.message} ({self.timestamp})'
