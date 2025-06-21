'use strict';
const { faker } = require('@faker-js/faker');

const users = [];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i <= 9; i++) {
      users.push({
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        created_at: new Date(),
        user_id: i+1
      });
    }

    await queryInterface.bulkInsert('customers', users);
    console.log('Seeded customers:', users.map(u => u.email));
  },

  async down(queryInterface, Sequelize) {

  }
};
