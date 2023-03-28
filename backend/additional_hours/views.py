from django.shortcuts import render
from .models import Activity, ActivityCourse, Course, UserActivity, UserCourse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST', 'GET'])
def insert_list_activity(request):
    if request.method == 'GET':
        try:
            activities = Activity.objects.get_all_activities_not_deleted()
            return Response({"result": activities})
        
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar atividades: {e}"
            print(full_message)
            message = "Falha ao listar atividades"
            return Response({"result": message})

    elif request.method == 'POST':
        name = request.data['name']
        description = request.data['description']
        new_activity = Activity(name=name,description=description)
        new_activity.save()
        new_activity_id = new_activity.id
        return Response({"result": f"Inserido com sucesso com id {new_activity_id}"})

@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity(request, pk):
    if request.method == 'GET':
        activity = Activity.objects.get_activity_not_deleted_by_pk(pk)
        return Response({"result": activity})

    elif request.method == 'DELETE':
        delete_result = Activity.objects.delete_activity_by_pk(pk)
        return Response({"result": delete_result['message']})

    elif request.method == 'PUT':
        name = request.data['name']
        description = request.data['description']
        update_result = Activity.objects.update_activity_by_pk(pk, name, description)
        return Response({"result": update_result['message']})
