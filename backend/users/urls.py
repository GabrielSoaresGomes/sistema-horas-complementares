from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RegistrationView, LoginView, LogoutView, ChangePasswordView, login, detail_update_delete, list
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('list', list, name='list_user'),
    path('list/<int:pk>/', detail_update_delete, name='user_detail'),

    path('accounts/register/', RegistrationView.as_view(), name='register_user'),
    path('', login),
    path('accounts/login/', LoginView.as_view(), name='login_user'),
    path('accounts/logout/', LogoutView.as_view(), name='logout_user'),
    path('accounts/change-password/', ChangePasswordView.as_view(), name='register'),
    path('accounts/token-refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
