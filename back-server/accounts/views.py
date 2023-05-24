from django.http import HttpResponse, JsonResponse
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
def user_id(request):
    if request.method == 'POST':
        user = get_object_or_404(get_user_model(), pk=request.user.id)
        return Response(user.id, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_point(request):
    if request.method == 'POST':
        user = get_object_or_404(get_user_model(), pk=request.user.id)
        return Response(user.points, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_point(request, amount):
    if request.method == 'POST':
        user = get_object_or_404(get_user_model(), pk=request.user.id)
        user.points += int(amount)
        user.save()
        return Response(user.points, status=status.HTTP_200_OK)


@api_view(['POST'])
def send_message(request):
    access_key = SECRETE.ACCESS_KEY
    secrete_key = SECRETE.SECRETE_KEY
    service_id= SECRETE.SEVICE_ID
    my_number = SECRETE.MY_NUMBER
    verification_code = api.generate_verification_code()

    if request.method == 'POST':
        user_number = json.loads(request.body).get('userNumber')
        print(user_number)
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
            f'Error: {response}'
        }
        return HttpResponse(data)


def get_kakaoPay(request, amount):
    _admin_key = SECRETE.ADMIN_KEY # 개인 어드민키
    _url = f'https://kapi.kakao.com/v1/payment/ready'
    _headers = {
        'Authorization': f'KakaoAK {_admin_key}',
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8", 
    }
    _data = {
        'cid': 'TC0ONETIME',  # 가맹점 코드 (테스트용 코드)
        'partner_order_id':'partner_order_id', # 주문 번호
        'partner_user_id':'partner_user_id',   # 유저 아이디
        'item_name':f'포인트 {amount}',   # 구매 물품 이름
        'quantity':'1',   # 구매 물품 수량
        'total_amount': amount, # 구매 물품 가격
        'vat_amount':'0',  # 구매 물품 비과세
        'tax_free_amount':'0',
        # 내 애플리케이션 -> 앱설정 / 플랫폼 - WEB 사이트 도메인에 등록된 정보만 가능
        # * 등록 : http://127.0.0.1:8000 
        'approval_url':'http://localhost:8080/v/pay/success', # 결제 성공시 이동  
        'fail_url':'http://localhost:8080/v/pay/fail',
        'cancel_url':'http://localhost:8080/v/pay/cancel'
    }
    response = requests.post(_url, data=_data, headers=_headers)
    result = response.json()
    return JsonResponse(result)


@api_view(['POST'])
def paySuccess(request, pg_token, tid):
    _url = 'https://kapi.kakao.com/v1/payment/approve'
    _admin_key = SECRETE.ADMIN_KEY # 어드민키
    _headers = {
        'Authorization': f'KakaoAK {_admin_key}',
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
    _data = {
        'cid':'TC0ONETIME',
        'tid': tid,
        'partner_order_id':'partner_order_id',
        'partner_user_id':'partner_user_id',
        'pg_token': pg_token # 결제 승인을 인증하는 토큰
    }
    response = requests.post(_url, data=_data, headers=_headers)
    result = response.json()
    return JsonResponse(result)







