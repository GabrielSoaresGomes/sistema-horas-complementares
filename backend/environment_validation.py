import os
from dotenv import load_dotenv

load_dotenv()


class EnvironmentValidation:
    def __init__(self):
        self.env = None
        self.get_env_data()

    def get_env_data(self):
        try:
            self.env = {
                'DJANGO_DEBUG': os.getenv('DJANGO_DEBUG'),
                'SECRET_KEY': os.getenv('SECRET_KEY'),
                'CSRF_TRUSTED_ORIGINS': os.getenv('CSRF_TRUSTED_ORIGINS'),
                'ALLOWED_HOSTS': os.getenv('ALLOWED_HOSTS'),
                'ADMIN_USER': os.getenv('ADMIN_USER'),
                'ADMIN_PASSWORD': os.getenv('ADMIN_PASSWORD'),
                'DATABASE_POSTGRES_NAME': os.getenv('DATABASE_POSTGRES_NAME'),
                'DATABASE_POSTGRES_USER': os.getenv('DATABASE_POSTGRES_USER'),
                'DATABASE_POSTGRES_PASSWORD': os.getenv('DATABASE_POSTGRES_PASSWORD'),
                'DATABASE_POSTGRES_HOST': os.getenv('DATABASE_POSTGRES_HOST'),
                'DATABASE_POSTGRES_PORT': os.getenv('DATABASE_POSTGRES_PORT'),
                'IS_USING_SQLITE3': os.getenv('IS_USING_SQLITE3'),
                'DRIVE_EMAIL': os.getenv('DRIVE_EMAIL'),
                'DRIVE_PASSWORD': os.getenv('DRIVE_PASSWORD'),
                'DRIVE_PROJECT_NAME': os.getenv('DRIVE_PROJECT_NAME'),
                'GS_BUCKET_NAME': os.getenv('GS_BUCKET_NAME'),
                'DEFAULT_FILE_STORAGE': os.getenv('DEFAULT_FILE_STORAGE')
            }
            errors_list = list()
            for data in self.env:
                if not self.env.get(data):
                    errors_list.append(data)
            if len(errors_list):
                print(f'Os seguintes dados estão inválidos no .env: {errors_list}!')
        except Exception as error:
            print(f"Erro ao pegar os dados da env: {error}")

    def get(self, env_key):
        env_data = self.env.get(env_key)
        if env_data:
            return env_data
        else:
            return None
