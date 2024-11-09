from rest_framework import serializers
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source='author.username', read_only=True)

    class Meta:
        model = Chat
        fields = ('author_name', 'message', 'room_name')
