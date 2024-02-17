const { Pedido } = require("../models");
const { Usuario } = require("../models");

async function getPedidos() {
  return await Pedido.findAll({
    // attributes: ["id", "nome", "preco", "img"],
  });
}

// async function createProdutos(produto) {
//   try {
//     return await Produto.create({
//       nome: produto.nome,
//       preco: produto.preco,
//       img: produto.img,
//     });
//   } catch (error) {
//     console.error("createProdutos: ", error);

//     // TODO:: trocar pelo status code
//     return [
//       {
//         error: "cadastro do produto",
//         numero: 1548521452,
//       },
//     ];
//   }
// }

async function findPedido(id) {

  const pedido = await Pedido.findByPk(id );

  const usuario = (await pedido.getUsuario()).toJSON();


  const pedido_usuario = {...pedido.toJSON(), usuario};


  return pedido_usuario;

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
};
