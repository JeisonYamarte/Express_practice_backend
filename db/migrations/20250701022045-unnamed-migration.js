'use strict';

const {USER_TABLE} = require('../models/userModel');
const {DataTypes} = require ('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token',{
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
