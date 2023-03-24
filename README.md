# Sistema de Horas Complementares

Criação de um serviço que facilite o registro e o monitoramento de horas complementares

## Configuração Ambiente

### backend

1. Criação do ambiente virtual 
    1. [windows] Execute o comando: `py -m venv nome_venv`
    2. [linux] Execute o comando: `python3 -m venv nome_venv`
2. Ativação do ambiente virtual
    1. [Windows] Execute o comando: `nome_venv/script/activate`
    2. [Linux] Execute o comando: `source nome_venv/bin/activate`
3. Instalando dependências
    1. Execute o comando: `pip install -r requirements.txt`
4. Criando o .env
    1. Execute o comando: `cp .env-local .env`
5. Aplicando as migrates
    1. Execute o comando: `python backend/manage.py migrate`
6. Executando servidor:
    1. Execute o comando: `python backend/manage.py runserver`
## Regras de Projeto

### String

- Utilizar apóstrofo(aspas simples) para string no código
- Utilizar aspas duplas para string em arquivo que envolva json ou nos .envs

### Nome de Variáveis

- Utilizar snake_case para variáveis comuns, métodos, propriedades de JSON e para nome de colunas do banco
- Utilizar ChamelCase para nome de classes

### Nome de Arquivos

- Utilizar snake_case para nomeação de arquivos

### Identação

- Utilizar 4 de espaçamento para identação
 
## Body para APIs

### Register

{
  "email": "email@gmail.com",
  "registration": "matricula",
  "password": "senha",
  "password2": "senha"
}

### Login

{
  "email": "email@gmail.com",
  "password" : "senha"
}