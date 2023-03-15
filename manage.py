#!/usr/bin/env python
'''Django's command-line utility for administrative tasks.'''
import os
import sys


def main():
    '''Run administrative tasks.'''
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            'Não foi possível importar o Django. Verifique se ele está instalado e'
            'está disponível em seu PYTHONPATH do seu ambiente? Você esqueceu '
            'de ativar o seu ambiente virtual (venv | env)'
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
