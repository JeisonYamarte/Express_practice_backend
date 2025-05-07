const {faker} = require('@faker-js/faker');

class UsersService{
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
      });
    }
  }

  create(){
    // Create a new user
  }
  find(){
    return this.users;
  }
  findOne(id){
    return this.users.find(item => item.id === id);
  }
  update(){
    // Update a user
  }
  delete(){
    // Delete a user
  }

}

module.exports = UsersService;
