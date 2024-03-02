const express = require("express");
const router = express.Router();

const {
  getPedidos,
  findPedido,
} = require("../repository/pedidos-repository");

// ADMIN
router.get("/", async (req, res) => {
  const pedidos = await getPedidos();
  res.status(200).json(pedidos);
});

// 
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const pedido = await findPedido(id);

  if (!pedido) {
    res.status(404).send("Produto não localizado.");
    return;
  }
  res.status(200).json(pedido);
});

router.post("/", async (req, res) => {
  const dataToInsert = req.body;

  /* TODO: Adicionar só um item no carrinho
   * Pega o id do usuario, o item que vai add
   * Se não crie um novo pedido.
  */
  const new_pedido = {
    id: 123456,
    email: dataToInsert.email,
    produtos: []
  };

  if (new_pedido.id === undefined) {
    res.status(500).send(new_pedido);
  }

  res.status(201).send(new_pedido);
});

router.put("/:id", async (req, res) => {
  const { email } = req.params;
  const dataToUpdate = req.body;
  const new_usuario = 201;

  res.status(new_usuario).send();
});

router.delete("/:id", async (req, res) => {
  const { email } = req.params;
  const statusCode = 200; // retorna da função
  res.status(statusCode).send("Usuario excluído.");
});

module.exports = router;
