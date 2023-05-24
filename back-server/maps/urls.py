from django.urls import path
from . import views

urlpatterns = [
    path('maps/', views.map_list),
]
