const ProductsService = require('./productsService');

class CategoriesService {

  constructor(){
    this.categories= [];
    this.generate();
  };

  async generate(){
    const productsService = new ProductsService();
    const products = productsService.find();
    const categories = new Set();
    for (let i = 0; i < products.length; i++) {
      categories.add(products[i].category);
    }
    categories.forEach((item) => {
      this.categories.push({
        id: item,
        name: item,
      });
    });
  };

  async categoriesList(){
    return this.categories;
  }

  async find(id){
    const productsService = new ProductsService();
    const products = productsService.find();
    const productsByCategory = products.filter(item => item.category === id);
    return productsByCategory;
  };



}

module.exports = CategoriesService;
