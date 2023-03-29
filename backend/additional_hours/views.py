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
        try:
            name = request.data['name']
            description = request.data['description']
            new_activity = Activity(name=name, description=description)
            new_activity.save()
            new_activity_id = new_activity.id
            return Response({"result": f"Inserido com sucesso com id {new_activity_id}"})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar atividade: {e}"
            print(full_message)
            message = "Falha ao adicionar atividades"
            return Response({"result": message})


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity(request, pk):
    if request.method == 'GET':
        try:
            activity = Activity.objects.get_activity_not_deleted_by_pk(pk)
            return Response({"result": activity})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar atividade: {e}"
            print(full_message)
            message = "Falha ao detalhar atividade"
            return Response({"result": message})

    elif request.method == 'DELETE':
        try:
            delete_result = Activity.objects.delete_activity_by_pk(pk)
            return Response({"result": delete_result['message']})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar atividade: {e}"
            print(full_message)
            message = "Falha ao deletar atividade"
            return Response({"result": message})

    elif request.method == 'PUT':
        try:
            name = request.data['name']
            description = request.data['description']
            update_result = Activity.objects.update_activity_by_pk(pk, name, description)
            return Response({"result": update_result['message']})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar atividade: {e}"
            print(full_message)
            message = "Falha ao atualizar atividade"
            return Response({"result": message})

@api_view(['POST', 'GET'])
def insert_list_course(request):
    if request.method == 'GET':
        try:
            courses_result = Course.objects.get_all_not_deleted()
            if courses_result['success']:
                return Response({"result": courses_result['result']})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar cursos: {e}"
            print(full_message)
            message = "Falha ao listar cursos"
            return Response({"result": message})

    elif request.method == 'POST':
        name = request.data['name']
        code = request.data['description']
        new_course = Course(name=name, code=code)
        new_course.save()
        new_course_id = new_course.id
        return Response({"result": f"Inserido com sucesso com id {new_course_id}"})

@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_course(request, pk):
    if request.method == 'GET':
        try:
            course_result = Course.objects.get_not_deleted_by_pk(pk)
            if course_result['success']:
                return Response({"result": course_result['result']})
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar curso: {e}"
            print(full_message)
            message = "Falha ao detalhar curso"
            return Response({"result": message})

