// Importando o módulo express, que é um framework para construção de aplicações web em Node.js.
const express = require("express")
// Importando o módulo swagger-jsdoc que lê o código e gera a especificação.
const swaggerJSDoc = require("swagger-jsdoc")
// Importando o módulo swagger-ui-express.
const swaggerUi = require("swagger-ui-express")
// Importando o módulo cors
const cors = require("cors")
//Pegar diretorio dos arquivos do sistema OS
const path = require('path');

// Criando uma instância da aplicação Express.
const app = express()

// Middleware para permitir que a aplicação interprete JSON nas requisições.
app.use(express.json())
// Add Cors 
app.use(cors())

// Rotas
const produtosRouter = require("./routes/produtos")

//Adicionando os meu arquivos publicos 
app.use(express.static(path.join(__dirname, '/public')));

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
    //TODO:: Mudar par o seu projeto
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

app.get("/versao-valid",(req, res) =>{
  res.sendFile(__dirname + "/public/index.html")
} )

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


//End Point's 
app.use("/produtos", produtosRouter);

// Iniciando o servidor na porta definida.
app.listen(port, () => console.log(`Server listening on port ${port}`))