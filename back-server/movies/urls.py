from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.movie_list),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('genres/', views.genre_list),
    path('create-like/<int:movie_pk>/', views.create_likes),
    path('liked-movies/', views.liked_list),
]
