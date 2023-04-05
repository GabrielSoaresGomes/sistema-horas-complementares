import traceback
from rest_framework import status
from .models import Activity, ActivityCourse, Course, UserActivity, UserCourse
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render


@api_view(['POST', 'GET'])
def insert_list_activity(request):
    if request.method == 'GET':
        try:
            activities = Activity.objects.get_all_activities_not_deleted()
            context = {'activities': 'activities', 'title': 'Home', 'heading': 'Home', 'main_heading': 'Home'}
            return render(request, 'index.html', context)
            # Manter abaixo para quando usar react
            # return Response({"result": activities}, status=status.HTTP_200_OK)

        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar atividades: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao listar atividades"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            name = request.data['name']
            description = request.data['description']
            new_activity = Activity(name=name, description=description)
            new_activity.save()
            new_activity_id = new_activity.id
            return Response({"result": f"Inserido com sucesso com id {new_activity_id}"},
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar atividade: {e}"
            print(full_message)
            message = "Falha ao adicionar atividades"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity(request, pk):
    if request.method == 'GET':
        try:
            activity = Activity.objects.get_activity_not_deleted_by_pk(pk)
            return Response({"result": activity}, status=status.HTTP_200_OK)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar atividade: {e}"
            print(full_message)
            message = "Falha ao detalhar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = Activity.objects.delete_activity_by_pk(pk)
            return Response({"result": delete_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar atividade: {e}"
            print(full_message)
            message = "Falha ao deletar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            name = request.data['name']
            description = request.data['description']
            update_result = Activity.objects.update_activity_by_pk(pk, name, description)
            return Response({"result": update_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar atividade: {e}"
            print(full_message)
            message = "Falha ao atualizar atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST', 'GET'])
def insert_list_course(request):
    if request.method == 'GET':
        try:
            courses_result = Course.objects.get_all_not_deleted()
            if courses_result['success']:
                return Response({"result": courses_result['result']}, status=status.HTTP_200_OK)
            return Response({"result": courses_result['result'], "message": courses_result['message']},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar cursos: {e}"
            print(full_message)
            message = "Falha ao listar cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            name = request.data['name']
            code = request.data['code']
            new_course = Course(name=name, code=code)
            new_course.save()
            new_course_id = new_course.id
            return Response({"result": f"Inserido com sucesso com id {new_course_id}"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar curso: {e}"
            print(full_message)
            message = "Falha ao adicionar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_course(request, pk):
    if request.method == 'GET':
        try:
            course_result = Course.objects.get_not_deleted_by_pk(pk)
            if course_result['success']:
                return Response({"result": course_result['result']}, status=status.HTTP_200_OK)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar curso: {e}"
            print(full_message)
            message = "Falha ao detalhar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            delete_result = Course.objects.delete_activity_by_pk(pk)
            return Response({"result": delete_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar curso: {e}"
            print(full_message)
            message = "Falha ao deletar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            name = request.data['name']
            code = request.data['code']
            update_result = Course.objects.update_by_pk(pk, name, code)
            return Response({"result": update_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar curso: {e}"
            print(full_message)
            message = "Falha ao atualizar curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST', 'GET'])
def insert_list_activity_course(request):
    if request.method == 'GET':
        try:
            activity_course_result = ActivityCourse.objects.list_not_deleted_by_query(request.query_params)
            if activity_course_result['success']:
                return Response({"result": activity_course_result['result']}, status=status.HTTP_200_OK)
            return Response({"result": activity_course_result['result'], "message": activity_course_result['message']},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao listar atividades de cursos: {e}"
            print(full_message)
            message = "Falha ao listar atividades de cursos"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        try:
            new_activity_course_id = ActivityCourse.objects.insert_new_activity_course(request.data)
            if new_activity_course_id:
                return Response({"result": f"Inserido com sucesso com id {new_activity_course_id}"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"result": f"Não foi possível inserir uma atividade de curso "},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar atividade de curso: {e}"
            print(full_message)
            message = "Falha ao adicionar atividade de curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_activity_course(request, pk):
    if request.method == 'GET':
        try:
            activity_course_result = ActivityCourse.objects.get_not_deleted_by_pk(pk)
            if activity_course_result['success']:
                return Response({"result": activity_course_result['result']}, status=status.HTTP_200_OK)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao detalhar atividade do curso: {e}"
            print(full_message)
            message = "Falha ao detalhar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            activity_course_result = ActivityCourse.objects.delete_activity_by_pk(pk)
            return Response({"result": activity_course_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao deletar atividade do curso: {e}"
            print(full_message)
            message = "Falha ao deletar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'PUT':
        try:
            course_id = request.data['course_id']
            activity_id = request.data['activity_id']
            maximum_hours = request.data['maximum_hours']
            update_result = ActivityCourse.objects.update_by_pk(pk, course_id, activity_id, maximum_hours)
            return Response({"result": update_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar atividade do curso: {e}"
            print(full_message)
            message = "Falha ao atualizar atividade do curso"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


@api_view(['POST', 'GET'])
def insert_list_user_activity(request):
    if request.method == 'GET':
        try:
            result = UserActivity.objects.list_not_deleted_by_query(request.query_params)
            if result['success']:
                return Response({"result": result['result']}, status=status.HTTP_200_OK)
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
            new_object_id = UserActivity.objects.insert_new_user_activity(request.data)
            if new_object_id:
                return Response({"result": f"Inserido com sucesso com id {new_object_id}"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"result": f"Não foi possível inserir um usuário da atividade "},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao adicionar usuário da atividade: {e}"
            print(full_message)
            message = "Falha ao adicionar usuário da atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'DELETE', 'PUT'])
def detail_remove_update_user_activity(request, pk):

    if request.method == 'GET':
        try:
            result = UserActivity.objects.get_not_deleted_by_pk(pk)
            if result['success']:
                return Response({"result": result['result']}, status=status.HTTP_200_OK)
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
            update_result = UserActivity.objects.update_by_pk(pk, request.data)
            return Response({"result": update_result['message']}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            full_message = f"[ ERRO ] Falha ao atualizar usuário da atividade: {e}"
            print(full_message)
            message = "Falha ao atualizar usuário da atividade"
            return Response({"result": message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
