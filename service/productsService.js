const {faker} = require('@faker-js/faker');


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
    return this.products;
  }

  async findOne(id){
    return this.products.find(item => item.id === id);
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };


  }
}

module.exports = categoriesService;
