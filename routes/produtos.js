const express = require("express");
const {
  getProdutos,
  createProdutos,
  findProduto,
  updatedProduto,
  deleteProduto,
  getSearchProdutos,
} = require("../repository/produtos-repository");
const router = express.Router();

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
router.post("/", async (req, res) => {
  const dataToInsert = req.body;

  if (!dataToInsert.nome || !dataToInsert.preco) {
    res.status(400).send("Nome ou preço do produto não foi informado(a).");
    return;
  }

  const new_produto = await createProdutos(dataToInsert);

  if (new_produto.id === undefined) {
    res.status(500).send(new_produto);
  }

  res.status(201).send(new_produto);
});

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
router.get("/", async (req, res) => {
  const produtos = await getProdutos();
  res.status(200).json(produtos);
});

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
router.get("/search/", async (req, res) => {
  const { id, search } = req.query;
  let produto;

  if (search != undefined) {
    produto= await getSearchProdutos(search);
  } else {
    produto = await findProduto(id);
  }

  if (!produto) {
    res.status(404).send("Produto não localizado.");
    return;
  }
  res.status(200).json(produto);
});

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
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const new_produto = await updatedProduto(id, dataToUpdate);

  res.status(new_produto).send();
});

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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const statusCode = await deleteProduto(id);
  res.status(statusCode).send("Produto excluído.");
});

module.exports = router;
