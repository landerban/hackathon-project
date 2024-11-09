from django.urls import path
from . import views
app_name="auth"
urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("user/", views.get_user_view, name="get_user"),
    path("csrf/", views.csrf_token_view, name="csrf_token"),
    path("register/", views.register_view, name="register"),
    path("delete/", views.delete_user_view, name="delete_user"),
]