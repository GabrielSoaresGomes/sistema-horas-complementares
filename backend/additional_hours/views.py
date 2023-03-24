from django.shortcuts import render
from .models import Activity, ActivityCourse, Course, UserActivity, UserCourse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST', 'GET'])
def insert_list_activity(request):
    if request.method == 'GET':
        return Response({"result": "List"})
    elif request.method == 'POST':
        return Response({"result": "Insert"})

@api_view(['GET', 'DELETE', 'POST'])
def detail_remove_update_activity(request):
    return Response({"result": "get | delete | post"})
