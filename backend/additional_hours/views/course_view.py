import traceback
from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from additional_hours.models import Course
from additional_hours.serializers import CourseSerializer


@api_view(['POST', 'GET'])
def insert_list_course(request):
    if request.method == 'GET':
        try:
            courses = Course.objects.get_all_not_deleted()
            serialized_courses = CourseSerializer(courses['result'], many=True)
            context = {'courses': 'courses', 'title': 'Home', 'heading': 'Home', 'main_heading': 'Home'}
            return Response({"result": serialized_courses.data}, status=status.HTTP_200_OK)
            # Manter abaixo para quando usar react
            # return render(request, 'index.html', context)
        except Exception:
            full_message = f"[ ERRO ] Falha ao listar cursos: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao listar cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            course = CourseSerializer(data=request.data)
            if course.is_valid():
                course.save()
                course_id = course.data['id']
                return Response({"result": f"Inserido com sucesso com id {course_id}"}, status=status.HTTP_201_CREATED)
            return Response({"result": f"Não foi possível inserir um novo curso com os dados inseridos!"},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao adicionar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao adicionar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_course(request, pk):
    if request.method == 'GET':
        try:
            course_result = Course.objects.get_not_deleted_by_pk(pk)
            if course_result['success']:
                serialized_course = CourseSerializer(course_result['result'], many=False)
                return Response({"result": serialized_course.data}, status=status.HTTP_200_OK)
            return Response({"result": course_result['message']}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao detalhar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao detalhar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = Course.objects.delete_by_pk(pk)
            if delete_result['success']:
                return Response({"result": delete_result['message']}, status=status.HTTP_202_ACCEPTED)
            return Response({"result": delete_result['message']}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao deletar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao deletar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            course = Course.objects.get_instance_not_deleted_by_pk(pk)
            if (course['success']):
                course_serialized = CourseSerializer(instance=course['result'], data=request.data)
                if course_serialized.is_valid():
                    return Response({"result": 'Atualizado com sucesso!'}, status=status.HTTP_202_ACCEPTED)
            return Response({"result": "Dados fornecidos são inválidos!"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            full_message = f"[ ERRO ] Falha ao atualizar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao atualizar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

