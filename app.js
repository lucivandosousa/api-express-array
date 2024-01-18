// Importando o módulo express, que é um framework para construção de aplicações web em Node.js.
const express = require("express")
// Importando o módulo swagger-jsdoc que lê o código e gera a especificação.
const swaggerJSDoc = require("swagger-jsdoc")
// Importando o módulo swagger-ui-express.
const swaggerUi = require("swagger-ui-express")

// Criando uma instância da aplicação Express.
const app = express()

// Middleware para permitir que a aplicação interprete JSON nas requisições.
app.use(express.json())

// Definindo a porta em que a aplicação vai rodar.
const port = process.env.PORT || 3000

// Configuração do Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Exemplo de API CRUD com Express',
    version: '1.0.0',
    description: 'Documentação da API CRUD com Express e persistência em um Array de dados',
  },
  servers: [
    {
      url: `https://api-express-array.vercel.app`,
      description: 'Servidor de produção',
    },
    {
      url: `http://localhost:${port}`,
      description: 'Servidor local',
    }
  ],
}

const options = {
  swaggerDefinition,
  apis: ['app.js'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Array de produtos como exemplo de uma "base de dados".
let produtos = [
  {id: 1, descricao: "Produto 1"},
  {id: 2, descricao: "Produto 2"},
  {id: 3, descricao: "Produto 3"}
]

// Endpoint inicial para verificar se a API está funcionando.
/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint inicial para verificar se a API está funcionando
 *     responses:
 *       201:
 *         description: OK
 */
app.get("/", (req, res) => res.status(200).send("API express"))

// Endpoint para adicionar um novo produto.
/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Insere um produto
 *     requestBody:
 *       description: Dados a serem inseridos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: interger
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 */
app.post("/produtos", (req, res) => {
  const dataToInsert = req.body
  if (!dataToInsert.id || !dataToInsert.descricao) {
    res.status(206).send("ID ou descricão do produto não foi informado(a).")
    return
  }
  produtos.push(dataToInsert)
  res.status(201).send("Produto adicionado.")
})

// Endpoint para listar todos os produtos.
/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos)
})

// Endpoint para listar um produto com base no ID.
/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/produtos/:id", (req, res) => {
  const {id} = req.params
  const [produto] = produtos.filter(item => item.id == id)
  if (!produto) {
    res.status(404).send("Produto não localizado.")
    return
  }
  res.status(200).json(produto)
})

// Endpoint para atualizar um produto com base no ID.
/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados a serem atualizados no produto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
app.put("/produtos/:id", (req, res) => {
  const {id} = req.params
  const dataToUpdate = req.body
  const index = produtos.findIndex(item => item.id == id)
  if (index < 0) {
    res.status(404).send("Produto não localizado.")
    return
  }
  produtos[index] = {...produtos[index], ...dataToUpdate}
  res.status(200).send("Produto atualizado.")
})

// Endpoint para excluir um produto com base no ID.
/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
app.delete("/produtos/:id", (req, res) => {
  const {id} = req.params
  const index = produtos.findIndex(item => item.id == id)
  if(index < 0) {
    res.status(404).send("Produto não localizado.")
    return
  }
  produtos.splice(index, 1)
  res.status(200).send("Produto excluído.")
})

// Iniciando o servidor na porta definida.
app.listen(port, () => console.log(`Server listening on port ${port}`))