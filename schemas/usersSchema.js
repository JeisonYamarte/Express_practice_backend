const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(20);
const email = joi.string().email();
const password = joi.string().min(8).max(20);
const phone = joi.string().min(10).max(15);

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  phone: phone,
}).or('name', 'email', 'password', 'phone');

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {getUserSchema, createUserSchema, updateUserSchema};
