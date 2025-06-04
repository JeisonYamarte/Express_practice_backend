const {User, UserSchema} = require ('./userModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  // Aquí puedes inicializar otros modelos
  // Por ejemplo: Product.init(ProductSchema, Product.config(sequelize));
  // No olvides definir las asociaciones si es necesario
  // User.associate(sequelize.models);
}

module.exports = setupModels;
