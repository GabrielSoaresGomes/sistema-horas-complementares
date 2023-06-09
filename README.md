# Sistema de Horas Complementares

Criação de um serviço que facilite o registro e o monitoramento de horas complementares

## Integrantes

- Gabriel Soares Gomes, 202110116
- Junior Nascimento Guimarães, 202110323
- Mizael Lucas Pardal Gonçalves Ribeiro, 202120339
- João de Oliveira Barbosa, 202120479

## Configuração Ambiente

### backend

#### Executar Docker Local

1. Executar o comando: `bash runProjectLocal.sh`
2. Acessar a url: http://localhost:8002

#### Executar fora do Docker 

1. Criação do ambiente virtual 
    1. [windows] Execute o comando: `py -m venv nome_venv`
    2. [linux] Execute o comando: `python3 -m venv nome_venv`
2. Ativação do ambiente virtual
    1. [Windows] Execute o comando: `nome_venv/script/activate`
    2. [Linux] Execute o comando: `source nome_venv/bin/activate`
3. Instalando dependências
    1. Execute o comando: `pip install -r requirements.txt`
4. Criando o .env
    1. Execute o comando: `cp ./backend/.env-local .env`
5. Aplicando as migrates
    1. Execute o comando: `python backend/manage.py migrate`
6. Executando servidor:
    1. Execute o comando: `python backend/manage.py runserver`

## Comandos do runCommands

### Iniciar o container

Utilizar esse comando quando quiser iniciar o projeto pelo docker caso já tenha buildado ele antes.

Exemplos: `bash runCommands.sh start | bash runCommands.sh s`

### Parar o container

Utilizar esse comando para parar a execução do projeto dentro do container, mantendo ele buildado.

Exemplos: `bash runCommands.sh stop`

### Exibir logs

Utilizar esse comando quando quiser que seja exibidos os logs que ocorrem durante a execução do projeto dentro do docker.

Exemplos: `bash runCommands.sh logs | bash runCommands.sh log | bash runCommands.sh l`

### Abrir terminal

Utilizar esse comando para abrir o terminal dentro do docker quando estiver com projeto rodando.

Exemplos: `bash runCommands.sh terminal | bash runCommands.sh t`

## Regras de Projeto

### String

- Utilizar apóstrofo(aspas simples) para string no código
- Utilizar aspas duplas para string em arquivo que envolva json ou nos .envs

### Nome de Variáveis

- Utilizar snake_case para variáveis comuns, métodos, propriedades de JSON e para nome de colunas do banco
- Utilizar PascalCase para nome de classes

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
