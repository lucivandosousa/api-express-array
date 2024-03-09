const { Pedido } = require("../models");
const { ItemPedido } = require("../models");

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
      pedidos_usuarios = await Pedido.create({
        id_usuario: idUsuario,
        status: "carrinho",
      });

      for (let index = 0; index < produtos.length; index++) {
        const produto = produtos[index];

        await ItemPedido.create({
          id_pedido: pedidos_usuarios.id,
          id_produto: produto.id_produto,
          quantidade: produto.quantidade,
          preco_unitario: produto.preco_unitario,
        });
      }
    } else {
      // Atualizar
      pedidos_usuarios = validar_pedidos;

      for (let index = 0; index < produtos.length; index++) {
        const produto = produtos[index];

        // validar o pedido
        // validar os itens do pedidos
        // atualizar a quantidade
        // se quantidade for 0 ou não tiver na lista remover do carrinho

        const validarItensPedidos = await ItemPedido.findAll({
          where: {
            id_pedido: pedidos_usuarios.id,
            id_produto: produto.id_produto,
          },
        });

        if (validarItensPedidos.length === 0) {
          //create
          await ItemPedido.create({
            id_pedido: pedidos_usuarios.id,
            id_produto: produto.id_produto,
            quantidade: produto.quantidade,
            preco_unitario: produto.preco_unitario,
          });
        } else {
          // update
          const atualizar_itens = validarItensPedidos[0];
          await atualizar_itens.update({
            quantidade: produto.quantidade,
          });
        }
      }

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

module.exports = {
  getPedidos,
  findPedido,
  findUsuarioPedidos,
  createPedidos,
};
