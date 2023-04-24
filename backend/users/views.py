import traceback
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .utils import get_tokens_for_user
from .models import User
from .serializers import RegistrationSerializer, PasswordChangeSerializer, UserListDetailSerializer


# API Usuário
class UserList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserListDetailSerializer


@api_view(['GET', 'PUT'])
def detail_update(request, pk):
    if request.method == 'PUT':
        try:
            user = User.objects.get(pk=pk, deleted_at=None)
            if user:
                user_serialized = UserListDetailSerializer(instance=user, data=request.data)
                if user_serialized.is_valid():
                    user_serialized.save()
                    return Response({"result": user_serialized.data, "message": ""})
            return Response({"result": None, "message": "Não foi possível editar o usuário com os dados inseridos!"},
                            status=status.HTTP_404_NOT_FOUND)

        except Exception:
            full_message = f"[ ERRO ] Falha ao atualizar usuário: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao atualizar usuário"
            return Response({"result": None, "message": message},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'GET':
        try:
            user = User.objects.get(pk=pk, deleted_at=None)
            if user:
                user_serialized = UserListDetailSerializer(user, many=False)
                return Response({"result": user_serialized.data, "message": ""},
                                status=status.HTTP_200_OK)
            return Response({"result": None, "message": "Não foi possível detalhar o usuário solicitado!"},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception:
            full_message = f"[ ERRO ] Falha ao detalhar usuário: {traceback.format_exc()}"
            print(full_message)
            message = "Falha ao detalhar usuário"
            return Response({"result": None, "message": message},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Autenticação
class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'msg': 'Credenciais faltando'}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data['email']
        password = request.data['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            auth_data = get_tokens_for_user(request.user)
            return Response({'msg': 'Sucesso no Login', **auth_data}, status=status.HTTP_200_OK)
        return Response({'msg': 'Credenciais Inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

      
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'msg': 'Sucesso no Logout '}, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = PasswordChangeSerializer(context={'request': request}, data=request.data)
        serializer.is_valid(raise_exception=True) #Another way to write is as in Line 17
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
