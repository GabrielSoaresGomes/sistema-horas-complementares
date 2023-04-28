import os
import json
import datetime
from pathlib import Path
from dotenv import load_dotenv
from google.oauth2 import service_account
load_dotenv()

try:
    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent
    SECRET_KEY = os.getenv('SECRET_KEY')
    DEBUG = os.getenv('DJANGO_DEBUG')
    csrf_trusted_origins_env = os.getenv('CSRF_TRUSTED_ORIGINS')
    CSRF_TRUSTED_ORIGINS = json.loads(csrf_trusted_origins_env)
    allowed_hosts_env = os.getenv('ALLOWED_HOSTS')
    ALLOWED_HOSTS = json.loads(allowed_hosts_env)
except Exception:
    print('Não foi possível carregar informações do .env para configuração do Django')

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "users.apps.UsersConfig",
    "additional_hours.apps.AdditionalHoursConfig",
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:4444',
    'http://localhost:3000'
]
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4444',
]
CORS_ALLOWED_ORIGIN_REGEXES = [
    'http://localhost:4444',
]


ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        'DIRS': ['templates'],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
try:
    DATABASE_POSTGRES_HOST = os.getenv('DATABASE_POSTGRES_HOST')

    DATABASE_POSTGRES_PORT = os.getenv('DATABASE_POSTGRES_PORT')

    DATABASE_POSTGRES_PASSWORD = os.getenv('DATABASE_POSTGRES_PASSWORD')

    DATABASE_POSTGRES_USER = os.getenv('DATABASE_POSTGRES_USER')

    DATABASE_POSTGRES_NAME = os.getenv('DATABASE_POSTGRES_NAME')

    CONN_MAX_AGE = 0

    IS_USING_SQLITE3 = json.loads(os.getenv('IS_USING_SQLITE3'))
except Exception:
    print('Não foi possível carregar informações do .env de credenciais de banco!')
if not IS_USING_SQLITE3:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': DATABASE_POSTGRES_NAME,
            'USER': DATABASE_POSTGRES_USER,
            'PASSWORD': DATABASE_POSTGRES_PASSWORD,
            'HOST': DATABASE_POSTGRES_HOST,
            'PORT': DATABASE_POSTGRES_PORT,
        }
    }
else:
    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'horas_complementares',
    }
}



# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Configurações do rest_framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=1),
}


LANGUAGE_CODE = "pt-br"

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "../../frontend/static/"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_PROFILE_MODULE = 'users.User'

AUTH_USER_MODEL = 'users.User'


# storage

try:
    GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
        os.path.join(BASE_DIR, 'crucial-oarlock-384600-58d68c374958.json')
    )
    DEFAULT_FILE_STORAGE = os.getenv('DEFAULT_FILE_STORAGE')
    GS_BUCKET_NAME = os.getenv('GS_BUCKET_NAME')
except Exception:
    print('Não foi possível obter informações da Google Cloud.')