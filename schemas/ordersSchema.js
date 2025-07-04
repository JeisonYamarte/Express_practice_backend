const joi = require('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();
const status = joi.string().valid('pending', 'completed', 'cancelled');
const orderId = joi.number().integer();
const productId = joi.number().integer();
const quantity = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  //customerId: customerId.required(),
  status: status.required(),
});

const updateOrderSchema = joi.object({
  customerId: customerId,
  status: status,
}).or('customerId', 'status');

const getOrderSchema = joi.object({
  id: id.required(),
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema,
};
// This code defines the schemas for validating order data using Joi.
