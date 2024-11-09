from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone


# class UserManager(BaseUserManager):
#     def create_user(self, password=None, user_id=None, **extra_fields):
#         user = self.model(user_id=user_id, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         user.username = user_id
#         return user

#     def create_superuser(self, password=None, user_id=None, username=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(password=password, user_id=user_id, **extra_fields)


class User(AbstractUser):
    class LanguageChoices(models.TextChoices):
        KR = ("kr", "Korean")
        EN = ("en", "English")

    name = models.CharField(
        max_length=150,
        unique=True,
        default="",
    )
    date_joined = models.DateTimeField(
        default=timezone.now,
    )
    is_active = models.BooleanField(
        default=True,
    )
    is_staff = models.BooleanField(
        default=False,
    )
    language = models.CharField(
        max_length=2,
        choices=LanguageChoices.choices,
    )
    time_limit_sec = models.PositiveIntegerField(
        default=60,
    )
    last_pixel_time = models.DateTimeField(
        default=timezone.now,
    )
    first_name = models.CharField(
        max_length=150,
        editable=False,
    )
    last_name = models.CharField(
        max_length=150,
        editable=False,
    )
    email = models.EmailField(
        editable=False,
    )

    # objects = UserManager()
    # USERNAME_FIELD = 'user_id'


class Meta:
    verbose_name = 'User'
    verbose_name_plural = 'Users'
