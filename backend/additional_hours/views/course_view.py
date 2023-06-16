import traceback
from rest_framework import status, serializers
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from django.shortcuts import render

from additional_hours.models import Course
from additional_hours.serializers import CourseSerializer


@api_view(['POST', 'GET'])
@renderer_classes([TemplateHTMLRenderer, JSONRenderer])
def insert_list_course(request):
    if request.method == 'GET':
        try:
            courses = Course.objects.get_all_not_deleted()
            serialized_courses = CourseSerializer(courses['result'], many=True)

            return Response({"result":serialized_courses.data},
                            status=status.HTTP_200_OK,
                            headers={"message": None}, template_name='get_courses.html')
        except Exception:
            full_message = f'[ ERRO ] Falha ao listar cursos: {traceback.format_exc()}'
            print(full_message)
            message = "Falha ao listar cursos"
            return Response({},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            headers={"message": message}, template_name='error.html')

    elif request.method == 'POST':
        try:
            course = CourseSerializer(data=request.data)
            if course.is_valid():
                course.save()
                course_id = course.data['id']
                return Response({},
                                status=status.HTTP_201_CREATED,
                                headers={"message": f"Inserido com sucesso com id {course_id}"},
                                template_name='success_courses.html')
            return Response({},
                            status=status.HTTP_400_BAD_REQUEST,
                            headers={"message": f"Não foi possível inserir um novo curso com os dados inseridos!"},
                            template_name='get_courses.html')
        except Exception:
            full_message = f"[ ERRO ] Falha ao adicionar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao adicionar curso"
            return Response({},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            headers={"message": message},
                            template_name='error.html')


@api_view(['GET', 'DELETE', 'POST'])
@renderer_classes([TemplateHTMLRenderer, JSONRenderer])
def detail_remove_update_course(request, pk):
    if request.method == 'GET':
        print(pk)
        try:
            course_result = Course.objects.get_not_deleted_by_pk(pk)
            if course_result['success']:
                serialized_course = CourseSerializer(course_result['result'], many=False)
                return Response({"result":serialized_course.data},
                                status=status.HTTP_200_OK,
                                headers={"message": None},
                                template_name='detail_course.html')
            return Response({},
                            status=status.HTTP_400_BAD_REQUEST,
                            headers={"message": course_result['message']}, template_name='detail_course.html')
        except Exception:
            full_message = f"[ ERRO ] Falha ao detalhar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao detalhar curso"
            return Response({},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            headers={"message": message})

    elif request.method == 'DELETE':
        try:
            delete_result = Course.objects.delete_by_pk(pk)
            if delete_result['success']:
                return Response({"result":{"id":pk}},
                                status=status.HTTP_202_ACCEPTED,
                                headers={"message": delete_result['message']},
                                template_name='detail_course.html')
            return Response({},
                            status=status.HTTP_400_BAD_REQUEST,
                            headers={"message": delete_result['message']})
        except Exception:
            full_message = f"[ ERRO ] Falha ao deletar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao deletar curso"
            return Response({},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            headers={"message": message})

    elif request.method == 'POST':
        try:
            course = Course.objects.get_instance_not_deleted_by_pk(pk)
            if (course['success']):
                course_serialized = CourseSerializer(instance=course['result'], data=request.data)
                if course_serialized.is_valid():
                    course_serialized.save()
                    return Response({},
                                    status=status.HTTP_202_ACCEPTED,
                                    headers={"message": "Atualizado com sucesso!"},
                                template_name='success_courses.html')
            return Response({},
                            status=status.HTTP_400_BAD_REQUEST,
                            headers={"message": "Dados fornecidos são inválidos!"},
                                template_name='detail_course.html')
        except Exception:
            full_message = f"[ ERRO ] Falha ao atualizar curso: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao atualizar curso"
            return Response({},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            headers={"message": message})

