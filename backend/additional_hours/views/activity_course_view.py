import traceback
from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from additional_hours.models import ActivityCourse
from additional_hours.serializers import ActivityCourseSerializer


@api_view(['POST', 'GET'])
def insert_list_activity_course(request):
    if request.method == 'GET':
        try:
            activity_course = ActivityCourse.objects.list_not_deleted_by_query(request.query_params)
            if activity_course:
                serialized_activity_course = ActivityCourseSerializer(activity_course['result'], many=True)
                return Response({"result": serialized_activity_course.data}, status=status.HTTP_200_OK)
            return Response({"result": activity_course, "message": activity_course['message']},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao listar atividades de cursos: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao listar atividades de cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            activity_course = ActivityCourseSerializer(data=request.data)
            if activity_course.is_valid():
                activity_course.save()
                activity_course_id = activity_course.data['id']
                return Response({"result": f"Inserido com sucesso com id {activity_course_id}"},
                                status=status.HTTP_201_CREATED)
            return Response({"result": f"Não foi possível inserir uma atividade de curso "},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao adicionar atividade de curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao adicionar atividade de curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity_course(request, pk):
    if request.method == 'GET':
        try:
            activity_course = ActivityCourse.objects.get_not_deleted_by_pk(pk)
            if activity_course['success']:
                serialized_activity_course = ActivityCourseSerializer(activity_course['result'])
                return Response({"result": serialized_activity_course.data}, status=status.HTTP_200_OK)
            return Response({"result": activity_course['result'], "message": activity_course['message']},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao detalhar atividade do curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao detalhar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            activity_course = ActivityCourse.objects.delete_by_pk(pk)
            if activity_course['success']:
                return Response({"result": '', "message": activity_course['message']},
                                status=status.HTTP_204_NO_CONTENT)
            return Response({"result": '', "message": activity_course['message']},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao deletar atividade do curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao deletar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            activity_course = ActivityCourse.objects.get_instance_not_deleted_by_pk(pk)
            if activity_course['success']:
                serialized_activity_course = ActivityCourseSerializer(instance=activity_course['result'], data=request.data)
                if serialized_activity_course.is_valid():
                    serialized_activity_course.save()
                    return Response({"result": serialized_activity_course.data, "message": "Atualizado com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            return Response({"result": f"Não foi possível editar uma atividade de um curso com os dados inseridos!"},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao atualizar atividade do curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao atualizar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

