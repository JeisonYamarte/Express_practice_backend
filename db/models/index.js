const {User, UserSchema} = require ('./userModel');
const {Customer, CustomerSchema} = require ('./customerModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
  // Aquí puedes inicializar otros modelos
  // Por ejemplo: Product.init(ProductSchema, Product.config(sequelize));
  // No olvides definir las asociaciones si es necesario
  // User.associate(sequelize.models);
}

module.exports = setupModels;
