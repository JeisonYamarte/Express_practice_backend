const {faker, da} = require('@faker-js/faker');

class UsersService{
  constructor(){
    this.users = [];
    this.generate();
  }

  async generate(){
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

  async create(data){
    const newUser={
      id: faker.string.uuid(),
      ...data,
    }
    this.users.push(newUser);
    return newUser;
  }


  async find(){
    return this.users;
  }

  async findOne(id){
    return this.users.find(item => item.id === id);
  }


  async update(data){
    const index = this.users.findIndex(item => item.id === data.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = this.users[index];
    const userUpdated = {
      ...user,
      ...data,
    };
    this.users[index] = userUpdated;
    return this.users[index];
  }


  async delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return {id};

  }

}

module.exports = UsersService;
