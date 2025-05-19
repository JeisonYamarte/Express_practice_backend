const {faker, da} = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgresPool');

class UsersService{
  constructor(){
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
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
    const query ='SELECT * FROM tasks';
    const respone = await this.pool.query(query);
    return respone.rows;
  }

  async findOne(id){
    return this.users.find(item => item.id === id);
  }


  async update(data){
    const index = this.users.findIndex(item => item.id === data.id);
    if (index === -1) {
      throw boom.notFound('User not found');
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
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return {id};

  }

}

module.exports = UsersService;
