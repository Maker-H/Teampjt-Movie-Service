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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_point(request):
    if request.method == 'POST':
        user = get_object_or_404(get_user_model(), pk=request.user.id)
        return Response(user.points, status=status.HTTP_200_OK)
