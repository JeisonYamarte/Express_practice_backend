'use strict';

const {OrderSchema, ORDER_TABLE} = require('../models/orderModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDER_TABLE, 'totalAmount');
  },

  async down (queryInterface, Sequelize) {
    // Re-adding the totalAmount column
  }
};
