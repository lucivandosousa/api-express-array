// Importando o módulo express, que é um framework para construção de aplicações web em Node.js.
const express = require("express")

// Criando uma instância da aplicação Express.
const app = express()

// Middleware para permitir que a aplicação interprete JSON nas requisições.
app.use(express.json())

// Definindo a porta em que a aplicação vai rodar.
const port = process.env.PORT || 3000

// Array de produtos como exemplo de uma "base de dados".
let produtos = [
  {id: 1, descricao: "Produto 1"},
  {id: 2, descricao: "Produto 2"},
  {id: 3, descricao: "Produto 3"}
]

// Endpoint inicial para verificar se a API está funcionando.
app.get("/", (req, res) => res.status(200).send("API express"))

// Endpoint para adicionar um novo produto.
app.post("/produtos", (req, res) => {
  const dataToInsert = req.body
  produtos.push(dataToInsert)
  res.status(201).send("Produto adicionado.")
})

// Endpoint para listar todos os produtos.
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos)
})

// Endpoint para listar um produto com base no ID.
app.get("/produtos/:id", (req, res) => {
  const {id} = req.params
  const produto = produtos.filter(item => item.id == id)
  res.status(200).json(produto)
})

// Endpoint para atualizar um produto com base no ID.
app.put("/produtos/:id", (req, res) => {
  const {id} = req.params
  const dataToUpdate = req.body
  const index = produtos.findIndex(item => item.id == id)
  produtos[index] = {...produtos[index], ...dataToUpdate}
  res.status(200).send("Produto atualizado.")
})

// Endpoint para excluir um produto com base no ID.
app.delete("/produtos/:id", (req, res) => {
  const {id} = req.params
  const index = produtos.findIndex(item => item.id == id)
  produtos.splice(index, 1)
  res.status(200).send("Produto excluído.")
})

// Iniciando o servidor na porta definida.
app.listen(port, () => console.log(`Server listening on port ${port}`))