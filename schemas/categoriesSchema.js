const joi = require('joi');


const id = joi.string();
const name = joi.string().min(3).max(20);
const image = joi.string().uri();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  image: image,
}).or('name', 'image');

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
// This schema defines the structure for categories in the application.
