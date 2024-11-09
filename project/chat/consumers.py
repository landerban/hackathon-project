import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user = self.scope['user']
        # self.room_group_name = 'chat_%s' % self.room_name

        # # Join room group
        # await self.channel_layer.group_add(
        #     self.room_group_name,
        #     self.channel_name
        # )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        # await self.channel_layer.group_discard(
        #     self.room_group_name,
        #     self.channel_name
        # )
        pass

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        userid = self.user.id
        room_name = self.room_name
        message = text_data_json['message']

        Chat.objects.create(message=message,
                            author=userid,
                            room_name=room_name,
                            )

        self.send(text_data=json.dumps({
            'username': self.user.username,
            'message': message
        }))
