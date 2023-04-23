import traceback
from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from additional_hours.models import UserActivity
from additional_hours.serializers import UserActivitySerializer


@api_view(['POST', 'GET'])
def insert_list_user_activity(request):
    if request.method == 'GET':
        try:
            result = UserActivity.objects.list_not_deleted_by_query(request.query_params)
            if result['success']:
                serialized_user_activity = UserActivitySerializer(result.get('result'), many=True)
                return Response({"result": serialized_user_activity.data}, status=status.HTTP_200_OK)
            return Response(
                {"result": result['result'], "message": result['message']},
                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar usuários de cursos: {e}"
            print(full_message)
            message = "Falha ao listar usuários de cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            user_activity = UserActivitySerializer(data=request.data)
            if user_activity.is_valid():
                user_activity.save()
                user_activity_id = user_activity.data.get('id')
                return Response({"result": f"Inserido com sucesso com id {user_activity_id}"},
                                status=status.HTTP_201_CREATED)
            return Response({"result": f"Não foi possível inserir um usuário da atividade "},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar usuário da atividade: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao adicionar usuário da atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_user_activity(request, pk):

    if request.method == 'GET':
        try:
            result = UserActivity.objects.get_not_deleted_by_pk(pk)
            if result['success']:
                serialized_user_activity = UserActivitySerializer(result.get('result'))
                return Response({"result": serialized_user_activity.data}, status=status.HTTP_200_OK)
            return Response({"result": result.get('result'), "message": result.get('message')},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar usuário da atividade: {e}"
            print(full_message)
            message = "Falha ao detalhar usuário da atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = UserActivity.objects.delete_by_pk(pk)
            return Response({"result": delete_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar usuário do curso: {e}"
            print(full_message)
            message = "Falha ao deletar usuário do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            user_activity = UserActivity.objects.get_instance_not_deleted_by_pk(pk)
            if user_activity.get('success'):
                serialized_user_activity = UserActivitySerializer(instance=user_activity.get('result'), data=request.data)
                if serialized_user_activity.is_valid():
                    serialized_user_activity.save()
                    return Response({"result": serialized_user_activity.data, "message": user_activity.get('message')},
                                    status=status.HTTP_204_NO_CONTENT)
            return Response({"result": user_activity.get('result'), 'message': user_activity.get('message')},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar usuário da atividade: {e}"
            print(full_message)
            message = "Falha ao atualizar usuário da atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def append_file_to_user_activity(request, pk):
    if request.method == 'POST':
        try:
            file = request.FILES.get('teste')
            result = UserActivity.objects.append_file(pk, file)
            if result['success']:
                return Response({"result": result['message']}, status=status.HTTP_200_OK)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao inserir arquivo: {e}"
            print(full_message)
            message = "Falha ao inserir arquivo"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
