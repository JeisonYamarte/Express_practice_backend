const joi = require('joi');

const id = joi.string();
const email = joi.string().email();
const role= joi.string().valid('admin', 'user').default('user');
const password = joi.string().min(8).max(20);
const isActive = joi.boolean();

const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role.default('user'),
  isActive: isActive.default(true),
});

const updateUserSchema = joi.object({
  email: email,
  role: role,
  password: password,
  isActive: isActive,
}).or('email', 'role', 'password', 'phone');

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {getUserSchema, createUserSchema, updateUserSchema};
