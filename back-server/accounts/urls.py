from django.urls import path
from . import views

urlpatterns = [
    path('id/', views.user_id),
    path('point/', views.user_point),
    path('point/<str:amount>/', views.update_user_point),
    path('message/', views.send_message),
    path('kakaoPay/<str:amount>/', views.get_kakaoPay),
    path('paySuccess/<str:pg_token>/<str:tid>/', views.paySuccess),
]
