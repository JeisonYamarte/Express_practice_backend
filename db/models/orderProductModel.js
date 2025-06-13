const {Model, DataTypes, Sequelize} = require('sequelize');

const {ORDER_TABLE} = require('./orderModel'); // Importing ORDER_TABLE for foreign key reference
const {PRODUCT_TABLE} = require('./productModel'); // Importing PRODUCT_TABLE for foreign key reference

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

class OrderProduct extends Model {
  static associate(models) {
    //this.belongsTo(models.Order, { as: 'order' });
    //this.belongsTo(models.Product, { as: 'product' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
// This code defines the OrderProduct model for managing the relationship between orders and products in the application.
