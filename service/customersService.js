const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

const bcrypt = require('bcrypt');

class CustomerService{
  constructor(){
  }


  async create(data){

  if (data.user && typeof data.user === 'object' && !Array.isArray(data.user)) {
    const newUser = await models.User.create(data.user);
    data.userId = newUser.id;
    delete data.user; // Eliminamos el objeto user para evitar conflictos
  } else if (typeof data.user === 'number') {
    data.userId = data.user;
    delete data.user;
  }

  const newCustomer = await models.Customer.create(data, {
    include: ['user'] // Incluye los datos asociados del usuario
  });

  if (newCustomer.dataValues.user) {
    delete newCustomer.dataValues.user.dataValues.password; // Elimina la contraseña de la respuesta
  }
    return newCustomer;
  }


  async find(){;
    const respone = await models.Customer.findAll({
      include: [{
        attributes: { exclude: ['password', 'recoveryToken'] }, // Exclude sensitive fields
        association:'user'
      }] // Include associated user data
    });
    return respone;
  }

  async findByUserName(name){;
    const respone = await models.Customer.findOne({
      where:{name},
      include: ['user'] // Include associated user data
    });
    if (!respone) {
      throw boom.notFound('User not found');
    }
    return respone.dataValues.user;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('User not found');
    }
    return customer;
  }

  async findUserId(id, userId){
    const customer = await this.findOne(id);
    if (customer.userId !== userId) {
      throw boom.notFound('Customer not found for this user or user not authorized');
    }
    return true;
  }


  async update(id, data){
    const customer = await this.findOne(id);
    const respone = await customer.update(data);


    return respone;
  }


  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();

    return {id};

  }

}

module.exports = CustomerService;
