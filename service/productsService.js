const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');


class categoriesService{

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        isblock: faker.datatype.boolean(0.8),
      });
    }
  }


  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;

  }

  async find(){
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id){

    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    };
    if (product.isblock) {
      throw boom.conflict('Product is blocked');
    };
    return product;

  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];
    const productUpdated = {
      ...product,
      ...changes,
    };
    this.products[index] = productUpdated;
    return this.products[index];

  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };


  }
}

module.exports = categoriesService;
