from django.urls import path
from .views import ChatList

app_name = "chat"
urlpatterns = [
    path("<str:room_name>/", ChatList.as_view(), name="chat_list"),
]
