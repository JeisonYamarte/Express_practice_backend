const joi = require('joi');

const id = joi.string();
const name = joi.string().min(3).max(50);
const lastName = joi.string().min(3).max(50).allow(null, ''); // Optional field for last name
const phone = joi.string();
const address = joi.string().max(100).allow(null, ''); // Optional field for customer address
const createdAt = joi.date().default(Date.now);
const userId = joi.number().integer(); // Assuming userId is required for customer creation

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  address: address,
  createdAt: createdAt,
  userId: userId.required(),
});

const updateCustomerSchema = joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  address: address,
  userId: userId,
}).or('name', 'lastName', 'phone', 'address', 'userId');

const getCustomerSchema = joi.object({
  id: id.required(),
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
