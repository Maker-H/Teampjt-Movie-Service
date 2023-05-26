from django.urls import path
from . import views

urlpatterns = [
    path('user-data/', views.user_detail),
    path('users/', views.user_list),
    path('point/', views.user_point),
    path('point/update/<str:amount>/', views.update_user_point),
    path('point/use/<int:amount>/', views.use_user_point),
    path('message/', views.send_message),
    path('kakaoPay/<str:amount>/', views.get_kakaoPay),
    path('paySuccess/<str:pg_token>/<str:tid>/', views.paySuccess),
]
