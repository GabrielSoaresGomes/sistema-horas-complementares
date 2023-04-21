import traceback
from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from additional_hours.models import Activity
from additional_hours.serializers import ActivitySerializer


@api_view(['POST', 'GET'])
def insert_list_activity(request):
    if request.method == 'GET':
        try:
            activities = Activity.objects.get_all_activities_not_deleted()
            serialized_activities = ActivitySerializer(activities, many=True)
            context = {'activities': 'activities', 'title': 'Home', 'heading': 'Home', 'main_heading': 'Home'}
            #return render(request, 'index.html', context)
            # Manter abaixo para quando usar react
            return Response({"result": serialized_activities.data}, status=status.HTTP_200_OK)

        except Exception:
            full_message = f"[ ERRO ] Falha ao listar atividades: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao listar atividades"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            activity = ActivitySerializer(data=request.data)
            if activity.is_valid():
                activity.save()
                new_activity_id = activity.data['id']
                return Response({"result": f"Inserido com sucesso com id {new_activity_id}"},
                                status=status.HTTP_201_CREATED)
            return Response({"result": f"Não foi possível inserir uma nova atividade com os dados inseridos!"},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao adicionar atividade: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao adicionar atividades"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity(request, pk):
    if request.method == 'GET':
        try:
            activity = Activity.objects.get_activity_not_deleted_by_pk(pk)
            serialized_activitiy = ActivitySerializer(activity, many=False)
            return Response({"result": serialized_activitiy.data}, status=status.HTTP_200_OK)
        except Exception:
            full_message = f"[ ERRO ] Falha ao detalhar atividade: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao detalhar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = Activity.objects.delete_activity_by_pk(pk)
            if delete_result['success']:
                return Response({"result": delete_result['message']}, status=status.HTTP_202_ACCEPTED)
            return Response({"result": delete_result['message']}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            full_message = f"[ ERRO ] Falha ao deletar atividade: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao deletar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            activity = Activity.objects.get_instance_not_deleted_by_pk(pk)
            activity_serialized = ActivitySerializer(instance=activity, data=request.data)
            if activity_serialized.is_valid():
                activity_serialized.save()
                return Response(activity_serialized.data)
            return Response({"result": f"Não foi possível editar uma atividade com os dados inseridos!"},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao atualizar atividade: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao atualizar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


