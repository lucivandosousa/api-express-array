const { Pedido } = require("../models");
const {
  createItemPedidos,
  getItemPedido,
  updateItemPedidos,
  deleteItemPedidos,
} = require("../repository/itempedido-repository");

async function getPedidos() {
  return await Pedido.findAll({
    // attributes: ["id", "nome", "preco", "img"],
  });
}

async function createPedidos(idUsuario, produtos) {
  try {
    let pedidos_usuarios = {};

    const validar_pedidos = await getUserCarrinho(idUsuario);

    if (validar_pedidos === undefined) {
      // Criar
      await createItensPedidos(idUsuario, produtos);
    } else {
      // Atualizar
      await updateItensPedidos(idUsuario, produtos);
    }
  } catch (error) {
    console.error("createPedidos: ", error);

    // TODO:: trocar pelo status code
    return [
      {
        error: "cadastro do produto",
        numero: 1548521452,
      },
    ];
  }
}

async function findUsuarioPedidos(idUsuario) {
  const new_pedidos = await getUserCarrinho(idUsuario);

  return await getAllItensPedidos(new_pedidos);
}

async function findPedido(id) {
  // Tabela Pedido ID 1
  const pedido = await Pedido.findByPk(id);

  // Tabela de Usuarios
  const usuario = (await pedido.getUsuario()).toJSON();
  // tabela ItemPedido
  const itens = await pedido.getItens();
  const itensCarrinho = await getItensCarrinho(itens);

  // OBJETO COMPLETO
  const pedido_usuario = { ...pedido.toJSON(), usuario, itensCarrinho };

  return pedido_usuario;
}

async function getItensCarrinho(itensProdutos) {
  const itensCarrinho = [];

  for (let index = 0; index < itensProdutos.length; index++) {
    const item = itensProdutos[index];

    const add_item = item.toJSON();
    const add_produto = (await item.getProduto()).toJSON();

    const carrinho = {
      quantidade: add_item.quantidade,
      preco_unitario: add_item.preco_unitario,
      nome_produto: add_produto.nome,
      img_produto: add_produto.img,
    };

    itensCarrinho.push(carrinho);
  }

  return itensCarrinho;
}

async function getAllItensPedidos(usuarioPedido) {
  const pedidosCarrinho = [];

  if (usuarioPedido === undefined) {
    return [];
  }
  // logica dos produtos
  const itens = await usuarioPedido.getItens();
  const itensCarrinho = await getItensCarrinho(itens);

  const pedidoItens = { ...usuarioPedido.toJSON(), itensCarrinho };

  pedidosCarrinho.push(pedidoItens);

  return pedidosCarrinho;
}

async function getUserCarrinho(idUsuario) {
  const pedidos = await Pedido.findAll({
    where: {
      id_usuario: idUsuario,
      status: "carrinho",
    },
  });

  return pedidos[pedidos.length - 1];
}

async function createItensPedidos(idUsuario, produtos) {
  pedidos_usuarios = await Pedido.create({
    id_usuario: idUsuario,
    status: "carrinho",
  });

  for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];
    await createItemPedidos(pedidos_usuarios.id, produto);
  }
}

async function updateItensPedidos(idUsuario, produtos) {
  pedidos_usuarios = await getUserCarrinho(idUsuario);

  await deleteItemPedidos(pedidos_usuarios.id, null);

  for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];
    await createItemPedidos(pedidos_usuarios.id, produto);
  }
}

async function updatePedidos(idUsuario) {
  try {
    const pedidos_usuarios = await getUserCarrinho(idUsuario);

    if (!pedidos_usuarios) {
      return 404;
    }

    await pedidos_usuarios.update({
      status: "pago",
    });

    return 200;
  } catch (error) {
    return 500;
  }
}

module.exports = {
  getPedidos,
  findPedido,
  findUsuarioPedidos,
  createPedidos,
  updatePedidos,
};
