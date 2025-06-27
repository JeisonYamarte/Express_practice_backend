const express = require('express');
const passport = require('passport');


const router = express.Router();


router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try{
      res.json({
        message: 'Logged in successfully',
        user: req.user, // The user object is available after successful authentication
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
