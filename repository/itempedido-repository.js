const { ItemPedido } = require("../models");

async function getItemPedido(id_pedido, id_produto) {
  const result_item_pedido = await ItemPedido.findAll({
    where: {
      id_pedido,
      id_produto,
    },
  });

  const item_pedido = result_item_pedido[0];
  return item_pedido;
}

async function createItemPedidos(id_pedido, produto) {
  return await ItemPedido.create({
    id_pedido: id_pedido,
    id_produto: produto.id_produto,
    quantidade: produto.quantidade,
    preco_unitario: produto.preco_unitario,
  });
}

async function updateItemPedidos(id_pedido, id_produto, quantidade) {
  const result_item_pedido = await getItemPedido(id_pedido, id_produto);

  if (result_item_pedido.length === 0) {
    return result_item_pedido;
  }

  const atualizar_itens = result_item_pedido;

  return await atualizar_itens.update({
    quantidade,
  });
}

async function deleteItemPedidos(id_pedido, id_produto) {
  if (id_produto === 0) {
    return [];
  }

  let result_item_pedido;

  if (id_produto === null) {
    // Todos os itens do pedidos foram removidos
    result_item_pedido = await ItemPedido.findAll({
      where: {
        id_pedido,
      },
    });

    for (let index = 0; index < result_item_pedido.length; index++) {
      const itemProduto = result_item_pedido[index];
      await itemProduto.destroy();
    }

    return [];
  } else {
    result_item_pedido = await getItemPedido(id_pedido, id_produto);
  }

  if (result_item_pedido.length === 0) {
    return result_item_pedido;
  }

  const atualizar_itens = result_item_pedido;

  await atualizar_itens.destroy();
}

module.exports = {
  getItemPedido,
  createItemPedidos,
  updateItemPedidos,
  deleteItemPedidos,
};
