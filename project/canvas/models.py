from django.db import models
from django.conf import settings
class Pixels(models.Model):
    time=models.DateTimeField(auto_now_add=True)
    canvas_id=models.IntegerField()
    pixel_x=models.IntegerField()
    piexl_y=models.IntegerField()
    placed_by=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    

    # hex color
    pixel_color=models.CharField(max_length=7, default="#ffffff")
    def __str__(self):
        return self.pixel_color