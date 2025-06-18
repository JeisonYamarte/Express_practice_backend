'use strict';

const {CustomerSchema, CUSTOMER_TABLE} = require('./../models/customerModel');
const {UserSchema, USER_TABLE} = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable(USER_TABLE);

    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

    if (table.phone) {
      await queryInterface.removeColumn(USER_TABLE, 'phone');
    }
<<<<<<< HEAD

=======
    
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
>>>>>>> 6f7cede2b256fc6ea9fa4c8f12440df0710362c7

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);


    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
