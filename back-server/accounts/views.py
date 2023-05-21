from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

import requests
import json
from . import api
from my_api import SECRETE

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_point(request):
    if request.method == 'POST':
        user = get_object_or_404(get_user_model(), pk=request.user.id)
        return Response(user.points, status=status.HTTP_200_OK)


@api_view(['POST'])
def send_message(request):
    access_key = SECRETE.ACCESS_KEY
    secrete_key = SECRETE.SECRETE_KEY
    service_id= SECRETE.SEVICE_ID
    my_number = SECRETE.MY_NUMBER
    verification_code = api.generate_verification_code()

    if request.method == 'POST':
        user_number = request.POST.get('userNumber')

        current_time = api.timestamp()
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': current_time,
            'x-ncp-iam-access-key': access_key,
            'x-ncp-apigw-signature-v2': api.make_signature(time=current_time, access_key=access_key, secrete_key=secrete_key, service_id=service_id)
        }

        body = api.generate_body(user_number=user_number, my_number=my_number, verification_code=verification_code)

        url = f'https://sens.apigw.ntruss.com/sms/v2/services/{service_id}/messages'
        
        response = requests.post(url, headers=headers, data=json.dumps(body))

    if response.status_code == 202:
        # 난수 반환
        data = {
            f'{verification_code}'
        }
        return HttpResponse(data)
    else:
        data = {
            f'Error ${response}'
        }
        return HttpResponse(data)

