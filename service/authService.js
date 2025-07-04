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
      return (boom.unauthorized('Invalid password'), false);
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

    delete user.dataValues.recoveryToken;

    return {
      user,
      token,
    }
  }

  async sendRecoveryPassword(email) {
    const user = await userService.findByEmail(email);
    if(!user) {
      throw boom.notFound('User not found');
    }

    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '10min', // Token expiration time
    });

    const link = `http://myfrontend.com/recovery?token=${token}`;

    await userService.update(user.id, {
      recoveryToken: token,
    })

    const mail ={
      from: config.smtpUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recuperacion de contraseña", // Subject line
      html: `<b>Ingresa al link => ${link} </b>`, // HTML body
    }

    const response = await this.sendMail(mail);

    return response;
  }

  async changePassword(token, newPassword){
    try{
      const payload = jwt.verify(token, config.jwtSecret);
      console.log(payload);

      const user = await userService.findOne(payload.sub);

      console.log(user);

      if (user.recoveryToken !== token){
        throw boom.unauthorized('Token invalid')
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await userService.update(user.id,{
        recoveryToken: null,
        password: hash
      })

      return({message: 'password changed succesfully'})

    } catch (error){
      throw boom.unauthorized('error');
    }
  }

  async sendMail(infoMail){

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      }
    });


  await transporter.sendMail(infoMail);

  return {
    message: 'Recovery email sent successfully',
  }

  }
}

module.exports = AuthService;
