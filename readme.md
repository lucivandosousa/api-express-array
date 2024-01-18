# API de Exemplo usando Express

Esta é uma API simples construída usando o framework Express.js para Node.js. A API simula operações básicas CRUD (Criar, Ler, Atualizar e Excluir) em uma lista de produtos.
Exemplo utilizado para colegas de turma.

## Requisitos

- Node.js
- npm (gerenciador de pacotes do Node.js)

## Instalação

### 1. Clone o repositório para sua máquina local:

```
git clone https://github.com/lucivandosousa/api-express-array.git
```
### 2. Navegue até o diretório do projeto

### 3. Instale as dependências necessárias:

  ```
  npm install
  ```
## Funcionalidades
### 1. Iniciar a API.

Para iniciar a API, execute o seguinte comando:

```
npm prod
```
A API será executada na porta 3000 por padrão, ou na porta especificada pela variável de ambiente PORT.

### 2. Endpoints

 - GET "/" Retorna uma mensagem indicando que a API está funcionando.

 - POST "/produtos" Adiciona um novo produto à lista de produtos.

 - GET "/produtos" Retorna a lista completa de produtos.

 - GET "/produtos/:id" Retorna um produto específico com base no ID fornecido.

 - PUT "/produtos/:id" Atualiza um produto específico com base no ID fornecido.

 - DELETE "/produtos/:id" Exclui um produto específico com base no ID fornecido.

 - GET "/api-docs" Exibe a interface gráfica do Swagger UI.

### 3. Exemplo de Uso

Para adicionar um novo produto, você pode enviar uma requisição POST com os detalhes do produto no corpo da requisição:

```
{
  "id": 4,
  "descricao": "Produto 4"
}
```
