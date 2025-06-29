const { Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const joi = require('joi');
const UsersService = require('../../../service/usersService');
const CustomersService = require('../../../service/customersService');

const service = new UsersService();
const customerService = new CustomersService();



const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },async(email, password, done)=>{
    try{
      const schema = joi.string().email();
      let user;
      if(!schema.validate(email).error) {
        user = await service.findByEmail(email);
      } else {
        user = await customerService.findByUserName(email);
      }

      if(!user) {
        done(boom.unauthorized('User not found'), false);
      }
      const isMatch = !schema.validate(email).error
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, user.dataValues.user.dataValues.password);
      if(!isMatch) {
        return done(boom.unauthorized('Invalid password'), false);
      }

      if (!schema.validate(email).error){
        delete user.dataValues.password;
      } else {
        delete user.dataValues.user.dataValues.password;
      }
      done(null, user);

    } catch (error) {
      return done(error);
    }
  }
);


module.exports = LocalStrategy;
