const express = require("express");
const {
  getUsuarios,
  createUsuarios,
  findUsuario,
  updatedUsuario,
} = require("../repository/usuarios-repository");
const { compared } = require("../helps/criptografar");
const { createToken } = require("../helps/jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await findUsuario(email, "password");

  if (!usuario) {
    res.status(404).send("usuario não localizado.");
    return;
  }

  const valid = await compared(senha, usuario.password);

  if (valid) {
    const usuario_auth = await findUsuario(email);

    const token = await createToken(usuario_auth);

    const message = { token, usuario: usuario_auth };

    res.status(200).json(message);
  } else {
    res.status(401).json({});
  }
});

module.exports = router;
