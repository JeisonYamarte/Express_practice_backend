
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

const bcrypt = require('bcrypt');

class UsersService{
  constructor(){
  }


  async create(data){
    //const hash = await bcrypt.hash(data.password, 10);
    const newUser= await models.User.create(data);

    delete newUser.dataValues.password; // Remove password from response
    delete newUser.dataValues.recoveryToken;

    return newUser;
  }


  async find(){;
    const respone = await models.User.findAll({
      include: ['customer'] // Include associated customer data
    });
    return respone;
  }

  async findByEmail(email){;
    const respone = await models.User.findOne({
      where: {
        email: email.toLowerCase()
      }
    });
    if (!respone) {
      throw boom.notFound('User not found');
    }
    return respone;
  }

  async findOne(id){
    const user = await models.User.findByPk(id,{
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }


  async update(id, data){
    const user = await this.findOne(id);
    const respone = await user.update(data);


    return respone;
  }


  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();

    return {id};

  }

}

module.exports = UsersService;
