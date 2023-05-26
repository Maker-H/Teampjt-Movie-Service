from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Map
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_list_or_404, get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import MapListSerializer
from .models import Map


# Create your views here.
@api_view(['GET'])
@method_decorator(csrf_exempt, name='dispatch')
def map_list(request):
    if request.method == 'GET':
        maps = get_list_or_404(Map)
        serializer = MapListSerializer(maps, many=True)
        return Response(serializer.data, status=200)

    
