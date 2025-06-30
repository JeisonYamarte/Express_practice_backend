const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const UsersService = require('../service/usersService');
const CustomersService = require('../service/customersService');


const userService = new UsersService();
const customerService = new CustomersService();

class AuthService {

  async getUser(email, password) {
    const schema = joi.string().email();
    let user;
    if(!schema.validate(email).error) {
      user = await userService.findByEmail(email);
    } else {
      user = await customerService.findByUserName(email);
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return done(boom.unauthorized('Invalid password'), false);
    }

    delete user.dataValues.password;
    return user;
  }

  async signToken(user){
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });

    if(!token) {
      throw boom.unauthorized('Invalid token');
    }

    return {
      user,
      token,
    }
  }

  async sendMail(email){
    const user = await userService.findByEmail(email);
    if(!user) {
      throw boom.notFound('User not found');
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      }
    });


  await transporter.sendMail({
    from: config.smtpUser, // sender address
    to: `${user.email}`, // list of receivers
    subject: "Funciona nodemailer?", // Subject line
    text: "Hello otro yo", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  return {
    message: 'Recovery email sent successfully',
  }

  }
}

module.exports = AuthService;
