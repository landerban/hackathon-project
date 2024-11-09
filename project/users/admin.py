from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (
            "Profile",
            {
                "fields": (
                    "username",
                    "password",
                    "pixels_count",
                    "last_pixel_time",
                    "galleries",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "Important Dates",
            {
                "fields": ("last_login", "date_joined"),
                "classes": ("collapse",),
            },
        ),
    )

    list_display = ("id", "username", "pixels_count",
                    "last_pixel_time", "galleries_display")
    list_display_links = ("username", )

    def galleries_display(self, obj):
        return ", ".join([str(gallery.id) for gallery in obj.galleries.all()])

    galleries_display.short_description = "Galleries"
