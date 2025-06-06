const joi = require('joi');

const id = joi.string();
const username = joi.string().min(3).max(20);
const email = joi.string().email();
const password = joi.string().min(8).max(20);
const phone = joi.string().pattern(/^\d{10}$/); // Example pattern for a 10-digit phone number
const isActive = joi.boolean();

const createUserSchema = joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
  isActive: isActive.default(true),
});

const updateUserSchema = joi.object({
  username: username,
  email: email,
  password: password,
  isActive: isActive,
}).or('name', 'email', 'password', 'phone');

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {getUserSchema, createUserSchema, updateUserSchema};
