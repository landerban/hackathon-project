from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

app_name="auth"
urlpatterns = [
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
    path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('user/', views.UserView.as_view(), name ='user'),
    path('register/', views.RegisterView.as_view(), name ='register'),
]