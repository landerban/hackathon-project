from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model
import json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = authenticate(request,username=data['username'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Logged in successfully"}, status=200)
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    return JsonResponse({"error": "Only POST requests allowed"}, status=400)

@csrf_exempt
def logout_view(request):
    if request.method == "POST":
        if request.user.is_authenticated:

            logout(request)
            return JsonResponse({"message": "Logged out successfully"}, status=200)
        return JsonResponse({"error":"You must be logged in to log out"})
    return JsonResponse({"error": "Only POST requests allowed"}, status=400)

@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        email=data.get("email")
        if not username or not password:
            return JsonResponse({"error": "Username and password are required"}, status=400)
        
        if get_user_model().objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)
        
        user = get_user_model.objects.create_user(username=username, password=password,email=email)
        login(request, user)  # Automatically log in the user after registration
        return JsonResponse({"message": "User registered successfully", "username": user.username}, status=201)
    
    return JsonResponse({"error": "Only POST requests allowed"}, status=400)

@login_required
@csrf_exempt
def delete_user_view(request):
    if request.method == "DELETE":
        user = request.user
        user.delete()
        return JsonResponse({"message": "User deleted successfully"}, status=200)
    
    return JsonResponse({"error": "Only DELETE requests allowed"}, status=400)


@csrf_exempt
def get_user_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username,"email": request.user.email,"pixels_placed": request.user.pixels_placed})
    return JsonResponse({"error": "Not authenticated"}, status=401)

@csrf_exempt
def csrf_token_view(request):
    return JsonResponse({"csrfToken": get_token(request)})