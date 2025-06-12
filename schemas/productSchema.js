const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(20);
const price = joi.number().integer().min(10).max(1000);
const description = joi.string().min(10).max(100);
const image = joi.string().uri();
const categoryId = joi.number().integer();



const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
}).or('name', 'price', 'description', 'image', 'category');

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = {getProductSchema, createProductSchema, updateProductSchema};
