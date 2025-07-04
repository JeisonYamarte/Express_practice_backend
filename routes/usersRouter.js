const express = require('express');
const passport = require('passport');

const {createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/usersSchema.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const {checkRoles} = require('../middlewares/authHandler.js')
const UsersService = require('../service/usersService.js');

const router = express.Router();
const service = new UsersService();

router.get('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  async (req, res)=>{
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    try {
      const newUser = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next)=>{
    const { id } = req.params;
    const body = req.body;
    try{
      const user = await service.update(id, body);
      res.json({
        message: 'updated',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    const { id } = req.params;
    try{
      const user = await service.delete(id);
      res.status(204).json({
        message: 'User deleted'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
