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
    await queryInterface.removeColumn(USER_TABLE, 'username');
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);


    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
