const {User, UserSchema} = require ('./userModel');
const {Customer, CustomerSchema} = require ('./customerModel');
const {Category, CategorySchema} = require ('./categoryModel');
const {Product, ProductSchema} = require ('./productModel');
const {Order, OrderSchema} = require ('./orderModel');
const {OrderProduct, OrderProductSchema} = require ('./orderProductModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));



  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  // Aquí puedes inicializar otros modelos
  // Por ejemplo: Product.init(ProductSchema, Product.config(sequelize));
  // No olvides definir las asociaciones si es necesario
  // User.associate(sequelize.models);
}

module.exports = setupModels;
