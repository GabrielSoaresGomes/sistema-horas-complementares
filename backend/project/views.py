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
        for url in get_urls():
            url_list.append({
                'url': url[0],
                'name': url[1]
            })
        response = Response(url_list)
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