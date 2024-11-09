from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UserSerializer


class HomeView(APIView):          
    def get(self, request):
        if request.user.is_authenticated:
          content = {'message': 'You Are Logged In'}
          return Response(content)
        content = {'message': 'You Are Logged In'}
        return Response(content)
    
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
class UserView(APIView):
     permission_classes=(IsAuthenticated,)
     def get(self,request):
                serializer=UserSerializer(request.user)
                return Response(serializer.data,status=status.HTTP_200_OK)
               
class RegisterView(APIView):
     def post(self,request):
          print(request.data)
          username=request.data.get('username',None)
          password=request.data.get('password',None)
          email=request.data.get('email',None)
          print(username,password)
          if username and password:
               u,created=get_user_model().objects.get_or_create(username=username,defaults={"username":username,"email":email})
               if created:
                    user=get_user_model().objects.get(username=username)
                    get_user_model().objects.get(username=username).set_password(password)
                    user.save()
                    return Response(status=status.HTTP_201_CREATED)
               else:
                    return Response(status=status.HTTP_409_CONFLICT)
          else:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
