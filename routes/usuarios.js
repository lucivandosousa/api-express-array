const express = require("express");
const {
  getUsuarios,
  createUsuarios,
  findUsuario,
  updatedUsuario,
  deleteUsuario,
} = require("../repository/usuarios-repository");

const router = express.Router();

router.get("/", async (req, res) => {
  const usuarios = await getUsuarios();
  res.status(200).json(usuarios);
});

router.get("/find", async (req, res) => {
  const { email } = req.body;

  const usuario = await findUsuario(email);

  if (!usuario) {
    res.status(404).send("usuario não localizado.");
    return;
  }
  res.status(200).json(usuario);
});

router.post("/", async (req, res) => {
  const dataToInsert = req.body;

  if (!dataToInsert.nome || !dataToInsert.email) {
    res.status(400).send("Nome ou preço do produto não foi informado(a).");
    return;
  }

  //Validar usuario existente
  if ((await findUsuario(dataToInsert.email)) != null) {
    res.status(400).send("Uusario já cadastrado!");
    return;
  }

  const new_usuario = await createUsuarios(dataToInsert);

  if (new_usuario.id === undefined) {
    res.status(500).send(new_usuario);
  }

  res.status(201).send(new_usuario);
});

router.put("/", async (req, res) => {
  const dataToUpdate = req.body;

  const new_usuario = await updatedUsuario(dataToUpdate.email, dataToUpdate);

  res.status(new_usuario).send();
});

router.delete("/", async (req, res) => {
  const dataToUpdate = req.body;
  
  const statusCode = await deleteUsuario(dataToUpdate.email); // retorna da função

  res.status(statusCode).send("Usuario excluído.");
});

module.exports = router;
