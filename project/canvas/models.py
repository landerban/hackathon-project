from django.db import models
from django.conf import settings
class Pixels(models.Model):
    time=models.DateTimeField(auto_now_add=True)
    canvas_id=models.IntegerField()
    pixel_x=models.IntegerField()
    pixel_y=models.IntegerField()
    placed_by=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,default=None)
    

    # hex color
    pixel_color=models.CharField(max_length=7, default="#ffffff")
    def __str__(self):
        return self.pixel_color
    
class Canvas(models.Model):
    background_image=models.ImageField(default="/srcs/fallback.png",max_length=150,upload_to='srcs/')
    credits=models.CharField(default="No Credits",max_length=150)
    time_control=models.CharField(max_length=8,default="blitz")
    color_pallette1=models.CharField(default="#a33a41",max_length=7)
    color_pallette2=models.CharField(default="#ea6d57",max_length=7)
    color_pallette2=models.CharField(default="#ffdc80",max_length=7)
    color_pallette3=models.CharField(default="#ffe8f0",max_length=7)
    color_pallette4=models.CharField(default="#f0596a",max_length=7)
    color_pallette5=models.CharField(default="#000000",max_length=7)
    color_pallette6=models.CharField(default="#251832",max_length=7)
    color_pallette7=models.CharField(default="#feeaf3",max_length=7)
    color_pallette8=models.CharField(default="#ffffff",max_length=7)
    def __str__(self):
        return self.time_control