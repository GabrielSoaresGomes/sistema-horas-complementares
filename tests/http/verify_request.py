# Realizando importações de libs utilzadas
import requests
import time

# Definindo variáveis de cor
resetColor = '\033[m'
redText = '\033[31m'
magentaText = '\033[1;35m'
yellowText = '\033[1;33m'
blueText = '\033[1;34m'
cyanText = '\033[1;36m'

PORT = 8002  # Local = 8000 | Docker = 8002

# Dicionário contendo as urls, os métodos e os bodys
urlsDict = {
    f'GET|http://127.0.0.1:{PORT}/api/activity/': {},
    f'GET|http://127.0.0.1:{PORT}/api/activity/1/': {},
    f'POST|http://127.0.0.1:{PORT}/api/activity/': {
        "name":  "Teste",
        "description": "Teste"
    },
    f'PUT|http://127.0.0.1:{PORT}/api/activity/1/': {
        "name":  "Novo nome",
        "description": "Nova descrição"
    },
    f'DELETE|http://127.0.0.1:{PORT}/api/activity/2/': {},
    f'GET|http://127.0.0.1:{PORT}/api/course/': {},
    f'GET|http://127.0.0.1:{PORT}/api/course/1/': {},
    f'POST|http://127.0.0.1:{PORT}/api/course/': {
        "name":  "Teste"
    },
    f'PUT|http://127.0.0.1:{PORT}/api/course/1/': {
        "name":  "Novo nome"
    },
    f'DELETE|http://127.0.0.1:{PORT}/api/course/2/': {},
    f'GET|http://127.0.0.1:{PORT}/api/activitycourse/': {},
    f'GET|http://127.0.0.1:{PORT}/api/activitycourse/?activity_id=1': {},
    f'GET|http://127.0.0.1:{PORT}/api/activitycourse/?course_id=1': {},
    f'GET|http://127.0.0.1:{PORT}/api/activitycourse/?activity_id=1&course_id=2': {},
    f'GET|http://127.0.0.1:{PORT}/api/activitycourse/1/': {},
    f'POST|http://127.0.0.1:{PORT}/api/activitycourse/': {
        "course_id": 2,
        "activity_id": 2,
        "maximum_hours":  "40"
    },
    f'PUT|http://127.0.0.1:{PORT}/api/activitycourse/1/': {
        "course_id": 2,
        "activity_id": 1,
        "maximum_hours":  10
    },
    f'DELETE|http://127.0.0.1:{PORT}/api/activitycourse/2/': {},
    f'GET|http://127.0.0.1:{PORT}/api/useractivity/': {},
    f'GET|http://127.0.0.1:{PORT}/api/useractivity/?activity_id=1': {},
    f'GET|http://127.0.0.1:{PORT}/api/useractivity/?user_id=2': {},
    f'GET|http://127.0.0.1:{PORT}/api/useractivity/?activity_id=1&user_id=2': {},
    f'GET|http://127.0.0.1:{PORT}/api/useractivity/1/': {},
    f'POST|http://127.0.0.1:{PORT}/api/useractivity/': {
        "activity_id": 2,
        "user_id": 1,
        "quantity":  "40",
        "hours_acc":  "40",
        "total_hours":  "40",
        "is_valid": False
    },
    f'PUT|http://127.0.0.1:{PORT}/api/useractivity/1/': {
        "activity_id": 1,
        "user_id": 1,
        "quantity":  "40",
        "hours_acc":  "40",
        "total_hours":  "40",
        "is_valid": False
    },
    f'DELETE|http://127.0.0.1:{PORT}/api/useractivity/2/': {},
}


def verifyActivityRequest():
    try:
        print(f'{blueText}--- INICIANDO VERIFICAÇÃO ---{resetColor}')

        # Iniciando a contagem de tempo e definindo variáveis de lista de erros
        start_time = time.time()
        errorList500 = []
        errorList400 = []
        errorList300 = []

        # Loop fazendo as requisições e validações
        for fullUrl in urlsDict:

            # Formatando os valores do objeto em variáveis mais simples
            method = fullUrl.split('|')[0]
            url = fullUrl.split('|')[1]
            body = urlsDict.get(fullUrl)
            response = ''

            # Verificação de qual método será utilizado na requisição
            if method == 'GET':
                response = requests.get(url)
            elif method == 'POST':
                response = requests.post(url, json=body)
            elif method == 'PUT':
                response = requests.put(url, json=body)
            elif method == 'DELETE':
                response = requests.delete(url)
            else:
                print(f'{redText}ALGO ESTÁ ERRADO!${resetColor}')

            # Pegando o resultado da requisição
            status_code = response.status_code
            responseDict = {
                fullUrl: response.text
            }

            # Verificando se houve erros na requisição e inserindo na lista de erros
            errorList500.append(responseDict) if 600 > status_code >= 500 else ''
            errorList400.append(responseDict) if 500 > status_code >= 400 else ''
            errorList300.append(responseDict) if 400 > status_code >= 300 else ''

        # Exibindo os erros que foram encontrados
        print(f'{redText}ERROS 500+:{resetColor}')
        print(f'{redText}{errorList500}{resetColor}')
        print(f'{magentaText}ERROS 400+:{resetColor}')
        print(f'{magentaText}{errorList400}{resetColor}')
        print(f'{yellowText}ERROS 300+:{resetColor}')
        print(f'{yellowText}{errorList300}{resetColor}')
        print(f'{blueText}--- FIM DA VERIFICAÇÃO ---{resetColor}')

        # Finalizando a contagem do método e arredondando o valor para 2 casas decimais
        end_time = time.time()
        total_time = round(end_time - start_time, 2)

        # Exibindo o tempo total gasto no método
        print(f'{cyanText}Tempo de execução: {total_time} segundos!{resetColor}')
    except Exception as error:
        print(f'Erro ao fazer testes, verifique se o back está rodando: {error}')


verifyActivityRequest()
