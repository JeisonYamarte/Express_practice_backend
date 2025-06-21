
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

const bcrypt = require('bcrypt');

class UsersService{
  constructor(){
  }


  async create(data){
    const hash = await bcrypt.hash(data.password, 10);
    const newUser= await models.User.create({
      ...data,
      password: hash
    });

    delete newUser.dataValues.password; // Remove password from response

    return newUser;
  }


  async find(){;
    const respone = await models.User.findAll({
      include: ['customer'] // Include associated customer data
    });
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
