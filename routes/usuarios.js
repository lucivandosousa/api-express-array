const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const usuarios = { nome: "chico" };
  res.status(200).json(usuarios);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = { nome: "chico" };

  if (!usuario) {
    res.status(404).send("usuario não localizado.");
    return;
  }
  res.status(200).json(usuario);
});

router.post("/", async (req, res) => {
  const dataToInsert = req.body;

  //   if (!dataToInsert.nome || !dataToInsert.preco) {
  //     res.status(400).send("Nome ou preço do produto não foi informado(a).");
  //     return;
  //   }

  const new_produto = {
    id: 123456,
    nome: dataToInsert.nome,
    email: dataToInsert.email,
  };

  if (new_produto.id === undefined) {
    res.status(500).send(new_produto);
  }

  res.status(201).send(new_produto);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const new_usuario = 201;

  res.status(new_usuario).send();
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const statusCode = 200; // retorna da função
  res.status(statusCode).send("Usuario excluído.");
});

module.exports = router;
