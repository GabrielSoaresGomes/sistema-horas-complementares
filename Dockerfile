FROM python:3.10.2-slim-bullseye

# Setando variáveis de ambiente
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Setando diretório de trabalho
WORKDIR /code

# Instalando dependências
COPY ./backend/requirements.txt ./backend/requirements.txt
RUN pip install -r ./backend/requirements.txt

# Copiando projeto
COPY ./backend ./backend