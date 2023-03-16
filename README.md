# Sistema de Horas Complementares

Criação de um serviço que facilite o registro e o monitoramento de horas complementares

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

### Regsiter

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