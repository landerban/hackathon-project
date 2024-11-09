from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pixels
from .serializer import PixelsSerializer

@api_view(['GET'])
def get_placements(request):
    pixels = Pixels.objects.all()
    serializer = PixelsSerializer(pixels, many=True)
    return Response(serializer.data)