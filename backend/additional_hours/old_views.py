import traceback
from rest_framework import status
from .models import Activity, ActivityCourse, Course, UserActivity, UserCourse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render


@api_view(['POST', 'GET'])
def insert_list_user_course(request):
    if request.method == 'GET':
        try:
            user_course = UserCourse.objects.list_not_deleted_by_query(request.query_params)
            if user_course['success']:
                return Response({"result": user_course['result']}, status=status.HTTP_200_OK)
            return Response(
                {"result": user_course['result'], "message": user_course['message']},
                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar usuários de cursos: {e}"
            print(full_message)
            message = "Falha ao listar usuários de cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            new_object_id = UserCourse.objects.insert_new_user_course(request.data)
            if new_object_id:
                return Response({"result": f"Inserido com sucesso com id {new_object_id}"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"result": f"Não foi possível inserir um usuário do curso "},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar usuário do curso: {e}"
            print(full_message)
            message = "Falha ao adicionar usuário do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_user_course(request, pk):

    if request.method == 'GET':
        try:
            user_course_result = UserCourse.objects.get_not_deleted_by_pk(pk)
            if user_course_result['success']:
                return Response({"result": user_course_result['result']}, status=status.HTTP_200_OK)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar usuário do curso: {e}"
            print(full_message)
            message = "Falha ao detalhar usuário do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = UserCourse.objects.delete_by_pk(pk)
            return Response({"result": delete_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar usuário do curso: {e}"
            print(full_message)
            message = "Falha ao deletar usuário do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            course_id = request.data['course_id']
            user_id = request.data['user_id']
            update_result = UserCourse.objects.update_by_pk(pk, course_id, user_id)
            return Response({"result": update_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar atividade do curso: {e}"
            print(full_message)
            message = "Falha ao atualizar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)