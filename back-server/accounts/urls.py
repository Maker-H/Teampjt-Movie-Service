from django.urls import path
from . import views

urlpatterns = [
    path('point/', views.user_point),
]
