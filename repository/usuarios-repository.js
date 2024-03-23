const { Usuario } = require("../models");
const {
  findUsuarioPedidos,
  createPedidos,
  updatePedidos,
} = require("../repository/pedidos-repository");
const { validarProdutos } = require("../repository/produtos-repository");

const { encoded } = require("../helps/criptografar");

async function getUsuarios() {
  return await Usuario.findAll({
    attributes: ["id", "nome", "email"],
  });
}

async function createUsuarios(usuario) {
  try {
    // Confirmação de E-MAIL
    const new_senha = await encoded(usuario.senha);

    return await Usuario.create({
      nome: usuario.nome,
      email: usuario.email,
      password: new_senha,
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

async function findUsuario(email, add_coluna) {
  const colunas_tabela = ["id", "nome", "email"];
  if (add_coluna != undefined) {
    colunas_tabela.push(add_coluna);
  }

  const resultado = await Usuario.findAll({
    where: {
      email: email,
    },
    attributes: colunas_tabela,
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

  if (usuario === null) {
    const error = {
      statusCode: 404,
      message: "Usuário não encontrado!",
    };

    return error;
  }

  const pedidos = await findUsuarioPedidos(usuario.id);

  const usuarioPedidosProdutos = { ...usuario, pedidos };

  return usuarioPedidosProdutos;
}

async function pedidosAddProdutos(email, produtos) {
  const usuario = await findUsuario(email);

  //TODO:: Validar itens do pedido
  const itensAddPedidos = await validarProdutos(produtos);

  if (itensAddPedidos.statusCode != undefined) {
    return itensAddPedidos;
  }

  //validar caso der erro
  await createPedidos(usuario.id, itensAddPedidos);

  // pedidos com os produtos criados
  const pedidos = await findUsuarioPedidos(usuario.id);

  // create pedidos
  console.log("pedidosAddProdutos", pedidos);

  return pedidos;
}

async function pagamento(email) {
  const usuario = await findUsuario(email);

  if (usuario === null) {
    const error = {
      statusCode: 404,
      message: "Usuário não encontrado!",
    };

    return error;
  }

  await updatePedidos(usuario.id);

  return {
    statusCode: 200,
    message: "Pagamento realizado com sucesso!",
  };
}

module.exports = {
  getUsuarios,
  createUsuarios,
  findUsuario,
  updatedUsuario,
  deleteUsuario,
  pedidos,
  pedidosAddProdutos,
  pagamento,
};
