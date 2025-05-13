const express = require('express');

const {createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/usersSchema.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const UsersService = require('../service/usersService.js');

const router = express.Router();
const service = new UsersService();

router.get('/',async (req, res)=>{
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
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
  validatorHandler(createUserSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newUser,
    });
  }
);

router.put('/:id',
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
