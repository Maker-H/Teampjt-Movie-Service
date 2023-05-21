from django.urls import path
from . import views

urlpatterns = [
    path('point/', views.user_point),
    path('message/', views.send_message),
    path('kakaoPay/<str:amount>/', views.get_kakaoPay),
    path('paySuccess/', views.paySuccess),
]
