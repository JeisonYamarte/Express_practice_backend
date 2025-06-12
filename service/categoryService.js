const boom = require('@hapi/boom');

const { models} = require('./../libs/sequelize');
class CategoriesService {

  constructor(){
  };

  async create(data) {
    const newCategory = await models.Category.create(data);
    if (!newCategory) {
      throw boom.badRequest('Error creating category');
    }
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();

    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'] // Assuming you want to include products in the category
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }



  async update(id, changes) {
    const category = this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    const response = await category.update(changes);
    if (!response) {
      throw boom.badRequest('Error updating category');
    }
    return response;
  }

  async delete(id) {
    const category = this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    await category.destroy();

    return { id };
  }

}

module.exports = CategoriesService;
