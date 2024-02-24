const { Usuario } = require("../models");
const { findUsuarioPedidos } = require("../repository/pedidos-repository");

async function getUsuarios() {
  return await Usuario.findAll({
    attributes: ["id", "nome", "email"],
  });
}

async function createUsuarios(usuario) {
  try {
    // Confirmação de E-MAIL
    return await Usuario.create({
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    // TODO:: trocar pelo status code
    return [
      {
        error: "cadastro do usuario",
        numero: 1548521452,
      },
    ];
  }
}

async function findUsuario(email) {
  const resultado = await Usuario.findAll({
    where: {
      email: email,
    },
    attributes: ["id", "nome", "email"],
  });

  if (resultado[0] === undefined) {
    return null;
  }

  return resultado[0].dataValues;
}

async function updatedUsuario(email, update_usuario) {
  try {
    // Confirmação de E-MAIL
    const usuario_db = await findUsuario(email);
    const usuario = await Usuario.findByPk(usuario_db.id);

    if (!usuario) {
      return 404;
    }
    await usuario.update({
      nome: update_usuario.nome,
    });

    return 200;
  } catch (error) {
    console.error("updatedUsuario : ", error);
    return 500;
  }
}

async function deleteUsuario(email) {
  try {
    const usuario_db = await findUsuario(email);
    const usuario = await Usuario.findByPk(usuario_db.id);

    if (!usuario) {
      return 404;
    }

    await usuario.destroy();

    return 200;
  } catch (error) {
    console.error("deleteUsuario : ", error);
    return 500;
  }
}

async function pedidos(email) {
  const usuario = await findUsuario(email);

  const pedidos = await findUsuarioPedidos(usuario.id)

  const usuarioPedidosProdutos = { ...usuario,  pedidos };

  return usuarioPedidosProdutos;
}

module.exports = {
  getUsuarios,
  createUsuarios,
  findUsuario,
  updatedUsuario,
  deleteUsuario,
  pedidos,
};
