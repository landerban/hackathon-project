from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pixels,Canvas
from django.contrib.auth import get_user_model
from .serializer import PixelsSerializer,CanvasSerializer
from django.utils.timezone import now
from datetime import datetime, timedelta

@api_view(['GET'])
def get_placements(request):
    pixels = Pixels.objects.all()
    serializer = PixelsSerializer(pixels, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_canvas(request):
    canvas=Canvas.objects.all()
    serializer=CanvasSerializer(canvas,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def place(request):
    serializer=PixelsSerializer(data=request.data)
    if serializer.is_valid():
        placementtime=now()
        placed_by=serializer.validated_data.get('placed_by')
        pixel_x=serializer.validated_data.get('pixel_x')
        pixel_y=serializer.validated_data.get('pixel_y')
        user_last_placed=get_user_model().objects.get(username=placed_by).last_pixel_time
        user_time_limit=get_user_model().objects.get(username=placed_by).time_limit_sec
        print(serializer.validated_data)
        print(pixel_x,pixel_y," debug \n")
        if placementtime>=user_last_placed+timedelta(seconds=user_time_limit):
            prev_placement=Pixels.objects.filter(pixel_x=pixel_x,pixel_y=pixel_y)
            if prev_placement.exists():
                print("deleting prev entry on the same location\n")
                prev_placement.delete()

            user = get_user_model().objects.get(username=placed_by)
            user.last_pixel_time=placementtime
            user.save()
            serializer.save()

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            print("rejected due to time limit\n")
    return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)