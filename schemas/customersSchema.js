const {createUserSchema, updateUserSchema} = require('./usersSchema');

const joi = require('joi');

const id = joi.string();
const name = joi.string().min(3).max(50);
const lastName = joi.string().min(3).max(50).allow(null, ''); // Optional field for last name
const phone = joi.string();
const address = joi.string().max(100).allow(null, ''); // Optional field for customer address
const createdAt = joi.date().default(Date.now);
const user = joi.alternatives().try(
  createUserSchema,
  joi.number().integer()
);
const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  address: address,
  createdAt: createdAt,
  user
  //user: createUserSchema.required() || userId.require // Include user creation schema
});

const updateCustomerSchema = joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  address: address,
  user: updateUserSchema, // Include user update schema
}).or('name', 'lastName', 'phone', 'address', 'userId');

const getCustomerSchema = joi.object({
  id: id.required(),
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
