'use strict';


const {UserSchema, USER_TABLE}= require('./../models/userModel')



/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'phone', {
      allowNull: true,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        is: /^[0-9]{10,15}$/, // Validates that the phone number is between 10 and 15 digits
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'phone');
  }
};
