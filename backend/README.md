# Sistema de Horas Complementares
Criação de um serviço que facilite o registro e o monitoramento de horas complementares

## Integrantes
- Gabriel Soares Gomes - 202110116
- Junior Nascimento Guimarães - 202110323
- Luiz Henrique -
- Luis Felipe - 202111316
- Bernardo de Andrade Peçanha - 202110271

## Executar o projeto local

1. Vá para a raiz da aplicação (backend-node)
2. Execute o comando: bash shc.sh build || bash shc.sh b
3. Agora o projeto está sendo executado, para ver os logs execute o comando: bash shc.sh logs || bash shc.sh l

## Explicação da estrutura do projeto (Para os devs)

### Arquivos na raiz

- .envs: Utilizados para manter segura informações / credenciais utilizadas no projeto
- docker-compose.yml: Arquivo utilizado para colocar o projeto e o banco em um container
- Dockerfile: Arquivo onde está a configuração do Container que usamos para o projeto
- environment-validation.js: É o arquivo onde visa validar se o .env contêm todas as informações necessárias para a execução do projeto
- main.js: Arquivo onde contêm a aplicação instânciada, onde se reúne no final toda a lógica do projeto, incluindo as rotas
- package.json: Arquivo padrão de projetos nodejs, nele é listado algumas informações do projeto e também a listagem de dependências
- server.js: Arquivo que importa a aplicação do main.js e executa ela em um servidor local com uma porta pré-definida
- shc.sh: Arquivo onde tem comandos que facilitam a execução do projeto
- test.http: Arquivo onde irá ser executados os testes para as apis do projeto

### Components

- Pasta onde estão localizadas as classes que mantêm a regra de negócio e a lógica do projeto
- Dentro de cada componente possuímos os seguintes itens:
  - data/: Pasta onde estão os arquivos que não envolvem regra de negócios, como consultas para o banco ou usar libs externas
      - connector: Pasta onde ficam localizados arquivos de conexões com banco  
  - entity/: Pasta onde tem arquivos de entidades, usadas no componente
  - test/: Pasta onde ficam os testes de unidade, utilizado para garantir a funcionalidade dos métodos do arquivo principal
  - Arquivo principal: Arquivo onde importa os repositórios, e também realiza as tratativas necessárias de regra de negócio, principalmente as tratativas de erro

### Routes

- Pasta onde ficam os arquivos de rotas, que utilizam os componentes

