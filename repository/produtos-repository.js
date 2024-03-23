const { Produto } = require("../models");
const {
  Op
} = require('sequelize');

async function getProdutos() {
  return await Produto.findAll({
    attributes: ["id", "nome", "preco", "img"],
  });
}

async function getSearchProdutos(search) {
  return await Produto.findAll({
    where: {
      nome: { [Op.like]: `%${search}%` },
    },
    attributes: ["id", "nome", "preco", "img"],
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

async function findProduto(id) {
  return await Produto.findByPk(id);
}

async function updatedProduto(id, update_produto) {
  try {
    const produto = await findProduto(id);

    if (!produto) {
      return 404;
    }

    await produto.update({
      nome: update_produto.nome,
      preco: update_produto.preco,
      img: update_produto.img,
    });

    return 200;
  } catch (error) {
    return 500;
  }
}

async function deleteProduto(id) {
  try {
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return 404;
    }

    await produto.destroy();

    return 200;
  } catch (error) {
    return 500;
  }
}

async function validarProdutos(produtos) {
  const produtosValidados = [];

  // TODO:: Caso o estoque acabe avise
  for (let index = 0; index < produtos.length; index++) {
    // logica se tem no estoque
    const produtoAddPedido = produtos[index];
    // validar produtos
    const produto = await findProduto(produtoAddPedido.id);

    if (produto === null) {
      const erro = {
        statusCode: 404,
        message: `Produto não encontrado! ${produtoAddPedido.id}`,
      };

      return erro;
    }

    const addProduto = produto.toJSON();

    produtosValidados.push({
      id_produto: addProduto.id,
      quantidade: produtoAddPedido.qtd,
      preco_unitario: addProduto.preco,
    });
  }

  return produtosValidados;
}

module.exports = {
  getProdutos,
  createProdutos,
  findProduto,
  updatedProduto,
  deleteProduto,
  validarProdutos,
  getSearchProdutos,
};
