const express = require("express");
const router = express.Router();

// ADMIN
router.get("/", async (req, res) => {
  const pedidos = { VALIDA: "TODOS" };
  res.status(200).json(pedidos);
});

// 
router.get("/:id", async (req, res) => {
  const { email } = req.body;

  const Pedido = { nome: "chico" };

  if (!Pedido) {
    res.status(404).send("Pedido não localizado.");
    return;
  }
  res.status(200).json(Pedido);
});

router.post("/", async (req, res) => {
  const dataToInsert = req.body;

  //   if (!dataToInsert.nome || !dataToInsert.preco) {
  //     res.status(400).send("Nome ou preço do produto não foi informado(a).");
  //     return;
  //   }

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
