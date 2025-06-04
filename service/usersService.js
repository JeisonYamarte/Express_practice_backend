const {faker, da} = require('@faker-js/faker');
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class UsersService{
  constructor(){
  }


  async create(data){
    const newUser= await models.User.create(data);

    return newUser;
  }


  async find(){;
    const respone = await models.User.findAll();
    return respone;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }


  async update(id, data){
    const user = await this.findOne(id);
    const respone = await user.update(data);

    //if (index === -1) {
    //  throw boom.notFound('User not found');
    //}
    /*const user = this.users[index];
    const userUpdated = {
      ...user,
      ...data,
    };
    this.users[index] = userUpdated;*/
    return respone;
  }


  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    /*const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);*/
    return {id};

  }

}

module.exports = UsersService;
