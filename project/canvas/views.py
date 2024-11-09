from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pixels,Canvas
from django.contrib.auth import get_user_model
from .serializer import PixelsSerializer,CanvasSerializer
from django.utils.timezone import now
from datetime import datetime, timedelta
from django.core.files.base import ContentFile

@api_view(['GET'])
def get_placements(request):
    pixels = Pixels.objects.all()
    serializer = PixelsSerializer(pixels, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_canvas(request):
    canvas=Canvas.objects.all()[0]
    serializer=CanvasSerializer(canvas)
    return Response(serializer.data)


@api_view(['POST'])
def place(request):
    serializer=PixelsSerializer(data=request.data)
    print("here")
    if serializer.is_valid():
        
        print("here")
        placementtime=now()
        placed_by=serializer.validated_data.get('placed_by')
        pixel_x=serializer.validated_data.get('pixel_x')
        pixel_y=serializer.validated_data.get('pixel_y')
        canvas_id=serializer.validated_data.get('canvas_id')
        user_last_placed=get_user_model().objects.get(username=placed_by).last_pixel_time
        time_control=Canvas.objects.get(id=canvas_id).time_control
        user_time_limit=0
        if time_control=="blitz":
            user_time_limit=10
        elif time_control=="rapid":
            user_time_limit=60
        elif time_control=="standard":
            user_time_limit=1800
        
        print(serializer.validated_data)
        print(pixel_x,pixel_y," debug \n")
        if placementtime>=user_last_placed+timedelta(seconds=user_time_limit):
            prev_placement=Pixels.objects.filter(pixel_x=pixel_x,pixel_y=pixel_y)
            if prev_placement.exists():
                print("deleting prev entry on the same location\n")
                prev_placement.delete()

            user = get_user_model().objects.get(username=placed_by)
            user.last_pixel_time=placementtime
            user.pixels_count+=1
            user.save()
            serializer.save()


            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            print("rejected due to time limit\n")
    return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)