const jwt = require("jsonwebtoken");

const segredo = "meuSegredoSuperSecreto";

const createToken = async (usuario) => {
  const config = { expiresIn: "1m", algorithm: "HS256" };

  const token = jwt.sign(usuario, segredo, config);

  return token;
};

module.exports = {
  createToken,
};
