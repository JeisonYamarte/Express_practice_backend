const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

const bcrypt = require('bcrypt');

class CustomerService{
  constructor(){
  }


  async create(data){


    const newCustomer= await models.Customer.create(data,{
      include: ['user'] // Include associated user data
    });

    delete newCustomer.dataValues.user.dataValues.password; // Remove password from response

    return newCustomer;
  }


  async find(){;
    const respone = await models.Customer.findAll({
      include: ['user'] // Include associated user data
    });
    return respone;
  }

  async findByUserName(name){;
    const respone = await models.Customer.findOne({
      where:{name},
      include: ['user'] // Include associated user data
    });
    return respone;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('User not found');
    }
    return customer;
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
