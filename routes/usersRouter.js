const express = require('express');
const UsersService = require('../service/usersService.js');

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res)=>{
  const users = service.find();
  res.json(users);
});

router.get('/:id', (req, res)=>{
  const { id } = req.params;
  const user = service.findOne(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: 'User not found'
    });
  }
});

router.post('/', (req, res)=>{
  // create user
});

router.put('/:id', (req, res)=>{
  // update user
});

router.delete('/:id', (req, res)=>{
  // delete user
});

module.exports = router;
