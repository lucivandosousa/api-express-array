const { Pedido } = require("../models");
const { Usuario } = require("../models");

async function getPedidos() {
  return await Pedido.findAll({
    // attributes: ["id", "nome", "preco", "img"],
  });
}

async function createProdutos(produto) {
  try {
    return await Produto.create({
      nome: produto.nome,
      preco: produto.preco,
      img: produto.img,
    });
  } catch (error) {
    console.error("createProdutos: ", error);

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
  const pedidos = await Pedido.findAll({
    where: {
      id_usuario: idUsuario,
    },
  });

  return await getAllItensPedidos(pedidos);
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

async function getAllItensPedidos(usuarioPedidos) {
  const pedidosCarrinho = [];

  for (let index = 0; index < usuarioPedidos.length; index++) {
    const pedido = usuarioPedidos[index]

    // logica dos produtos
    const itens = await pedido.getItens();
    const itensCarrinho = await getItensCarrinho(itens);

    const pedidoItens = {...pedido.toJSON(), itensCarrinho}

    pedidosCarrinho.push(pedidoItens);
  }


  return pedidosCarrinho;
}

// async function updatedProduto(id, update_produto) {
//   try {
//     const produto = await findProduto(id);

//     if (!produto) {
//       return 404;
//     }

//     await produto.update({
//       nome: update_produto.nome,
//       preco: update_produto.preco,
//       img: update_produto.img,
//     });

//     return 200;
//   } catch (error) {
//     return 500;
//   }
// }

// async function deleteProduto(id) {
//   try {
//     const produto = await Produto.findByPk(id);

//     if (!produto) {
//       return 404;
//     }

//     await produto.destroy();

//     return 200;
//   } catch (error) {
//     return 500;
//   }
// }

module.exports = {
  getPedidos,
  // createProdutos,
  findPedido,
  // updatedProduto,
  // deleteProduto,
  findUsuarioPedidos,
};
