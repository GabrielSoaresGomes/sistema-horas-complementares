from django.conf import settings
from django.urls import URLPattern, URLResolver
from django.views import View
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

class APIRootView(View):

    def get_context(self, request):
        return {'request': request}

    def get(self, request, format=None):
        url_list = []
        api_urls = {
            "Listar todas Urls": {
                "rota": "/",
                "method": ["GET"]
            },
            "Accounts": {
                "Registrar um novo usuário": {
                    "rota": "/users/accounts/register/",
                    "method": ["POST"]
                },
                "Logar um usuário": {
                    "rota": "/users/accounts/login/",
                    "method": ["POST"]
                },
                "Deslogar um usuário": {
                    "rota": "/users/accounts/logout/",
                    "method": ["POST"]
                },
                "Alterar senha": {
                    "rota": "/users/accounts/change-password/",
                    "method": ["POST"]
                },
                "Atualizar token": {
                    "rota": "/users/accounts/token-refresh/",
                    "method": ["POST"]
                }
            },
            "Api": {
                "Activity": {
                    "Listar ou adicionar atividades": {
                        "rota": "/api/activity/",
                        "method": ["GET", "POST"]
                    },
                    "Detalhar, atualizar ou apagar uma atividade": {
                        "rota": "/api/activity/<int:pk>/",
                        "method": ["GET", "PUT", "DELETE"]
                    }
                },
                "Course": {
                    "Listar ou adicionar cursos": {
                        "rota": "/api/course/",
                        "method": ["GET", "POST"]
                    },
                    "Detalhar, atualizar ou apagar um curso": {
                        "rota": "/api/course/<int:pk>/",
                        "method": ["GET", "PUT", "DELETE"]
                    }
                },
                "UserCourse": {
                    "Listar ou adicionar relação entre usuários e cursos": {
                        "rota": "/api/usercourse/",
                        "method": ["GET", "POST"]
                    },
                    "Detalhar, atualizar ou apagar uma relação entre usuários e cursos": {
                        "rota": "/api/usercourse/<int:pk>/",
                        "method": ["GET", "PUT", "DELETE"]
                    }
                },
                "UserActivity": {
                    "Listar ou adicionar relação entre usuários e atividades": {
                        "rota": "/api/useractivity/",
                        "method": ["GET", "POST"]
                    },
                    "Detalhar, atualizar ou apagar uma relação entre usuários e atividades": {
                        "rota": "/api/useractivity/<int:pk>/",
                        "method": ["GET", "PUT", "DELETE"]
                    },
                    "Adicionar um comprovante para uma atividade de um aluno": {
                        "rota": "/api/useractivity/file/",
                        "method": ["POST"]
                    }
                },
                "ActivityCourse": {
                    "Listar ou adicionar relação entre atividades e cursos": {
                        "rota": "/api/activitycourse/",
                        "method": ["GET", "POST"]
                    },
                    "Detalhar, atualizar ou apagar uma relação entre atividades e cursos": {
                        "rota": "/api/activitycourse/<int:pk>/",
                        "method": ["GET", "PUT", "DELETE"]
                    }
                },
            }
        }
        for url in get_urls():
            url_list.append({
                'url': url[0],
                'name': url[1]
            })
        # response = Response(url_list)
        response = Response(api_urls)
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = 'application/json'
        response.renderer_context = self.get_context(request)
        return response

def get_urls():
    """
    Retorna uma lista com todas as urls do projeto
    """
    url_patterns = __import__(settings.ROOT_URLCONF, {}, {}, ['']).urlpatterns
    return _get_all_urls(url_patterns)

def _get_all_urls(url_patterns):
    """
    Retorna uma lista com todas as urls do projeto recursivamente
    """
    url_list = []
    for url_pattern in url_patterns:
        if isinstance(url_pattern, URLPattern):
            url_list.append((str(url_pattern.pattern), url_pattern.name))
        elif isinstance(url_pattern, URLResolver):
            url_list += _get_all_urls(url_pattern.url_patterns)
    return url_list