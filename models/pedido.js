'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Pedido.hasMany(models.ItemPedido, {
          foreignKey: "id_pedido",
          as: "itens"
        })

        Pedido.belongsTo(models.Usuario, {
          foreignKey: "id_usuario"
        })
    }
  }
  Pedido.init({
    id_usuario: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};