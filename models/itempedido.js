'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemPedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemPedido.init({
    id_pedido: DataTypes.INTEGER,
    id_produto: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco_unitario: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemPedido',
  });
  return ItemPedido;
};