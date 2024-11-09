from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from gallery.models import Gallery


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
    username = models.CharField(
        max_length=150,
        unique=True,
        default="",
    )
    last_pixel_time = models.DateTimeField(
        default=timezone.datetime(1900, 1, 1),
    )
    first_name = models.CharField(
        max_length=150,
        editable=False,
    )
    last_name = models.CharField(
        max_length=150,
        editable=False,
    )
    pixels_count = models.PositiveIntegerField(
        default=0
    )
    galleries = models.ManyToManyField(
        Gallery,
        related_name='users'
    )

    def __str__(self):
        return self.username

    # objects = UserManager()
    # USERNAME_FIELD = 'user_id'


class Meta:
    verbose_name = 'User'
    verbose_name_plural = 'Users'
