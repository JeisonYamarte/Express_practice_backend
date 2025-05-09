const express = require('express');
const UsersService = require('../service/usersService.js');

const router = express.Router();
const service = new UsersService();

router.get('/',async (req, res)=>{
  const users = await service.find();
  res.json(users);
});

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const user = await service.findOne(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: 'User not found'
    });
  }
});

router.post('/', async (req, res)=>{
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

router.put('/:id', async (req, res)=>{
  const { id } = req.params;
  const body = req.body;
  const user = await service.update({id, ...body});
  res.json(user);
});

router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const user = await service.delete(id);
  res.status(204).json({
    message: 'User deleted'
  });
});

module.exports = router;
