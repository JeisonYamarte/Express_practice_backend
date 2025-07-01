const express = require('express');
const passport = require('passport');


const { config } = require('../config/config');
const AuthService = require('../service/authService');

const service = new AuthService();


const router = express.Router();


router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try{
      const user = req.user;
      const response = await service.signToken(user);
      res.json(response);

    } catch (error) {
      next(error);
    }
  });

  router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecoveryPassword(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  )

  router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  )

module.exports = router;
