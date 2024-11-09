from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pixels
from django.contrib.auth import get_user_model
from .serializer import PixelsSerializer
from django.utils.timezone import now
from datetime import datetime, timedelta

@api_view(['GET'])
def get_placements(request):
    pixels = Pixels.objects.all()
    serializer = PixelsSerializer(pixels, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def place(request):
    serializer=PixelsSerializer(data=request.data)
    if serializer.is_valid():
        placementtime=now()
        placed_by=serializer.data['placed_by']
        user_last_placed=getattr(get_user_model().objects().get(id=placed_by),'last_pixel_time')
        user_time_limit=getattr(get_user_model().objects().get(id=placed_by),'time_limit_sec')
        get_user_model().objects.filter(id=placed_by).update(user_last_placed=now())


        if placementtime>=user_last_placed+timedelta(seconds=user_time_limit):
            serializer.save()

            return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)