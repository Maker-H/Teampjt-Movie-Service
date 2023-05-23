import sys
import os
import hashlib
import hmac
import base64
import time
import random


def timestamp():
    current_time = int(time.time() * 1000)
    return str(current_time)


# https://api.ncloud-docs.com/docs/common-ncpapi
def	make_signature(time, access_key, secrete_key, service_id):
	secrete_key = bytes(secrete_key, 'UTF-8')

	method = "POST"
	uri = f'/sms/v2/services/{service_id}/messages'

	message = method + " " + uri + "\n" + time + "\n" + access_key
	message = bytes(message, 'UTF-8')
	signing_key = base64.b64encode(hmac.new(secrete_key, message, digestmod=hashlib.sha256).digest())
        
	return signing_key


# https://api.ncloud-docs.com/docs/ai-application-service-sens-smsv2#%EB%A9%94%EC%8B%9C%EC%A7%80%EB%B0%9C%EC%86%A1
def generate_body(user_number, my_number, verification_code):
    body = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": my_number,
        "content": f'인증번호 {verification_code}',
        "messages": [
            {
                "to": user_number
            }
        ]
    }

    return body


def generate_verification_code():
    verification_code = random.randint(100000, 999999)
    return str(verification_code)
