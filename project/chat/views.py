from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat
from .serializers import ChatSerializer
# Create your views here.


class ChatList(APIView):
    def get(self, request, room_name, format=None):
        messages = Chat.objects.filter(
            room_name=room_name).order_by('timestamp')
        serializer = ChatSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, room_name, format=None):
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(room_name=room_name)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
