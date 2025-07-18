
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');
const { Op } = require('sequelize');


class categoriesService{

  constructor(){
  }



  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;

  }

  async find(query){
    const options = {
      include: ['category'],
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }



    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){

    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    };


    return product;

  }

  async update(id, changes){
    const product = this.findOne(id);

    const respone = await product.update(changes);

    return respone;

  }

  async delete(id){
    const product = await this.findOne(id);

    await product.destroy();

    return { id };
  }
}

module.exports = categoriesService;
