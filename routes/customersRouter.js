const express = require('express');
const passport = require('passport');

const {checkRoles} = require('../middlewares/authHandler.js');
const {getCustomerSchema, createCustomerSchema, updateCustomerSchema} = require('../schemas/customersSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const CustomersService = require('../service/customersService');

const router = express.Router();
const service = new CustomersService();

router.get('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  async (req, res)=>{
  const customer = await service.find();
  res.json(customer);
});

router.get('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next)=>{
    const body = req.body;
    try {
      const newCustomer = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newCustomer,
      }
    );
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next)=>{
    const { id } = req.params;
    const {user }= req;
    const body = req.body;
    try{
      // Check if the user is authorized to update this customer
      const isAuthorized = await service.findUserId(id, user.sub);
      if(!isAuthorized){
        return res.status(403).json({ message: 'You are not authorized to update this customer' });
      }
      const customer = await service.update(id, body);
      res.json({
        message: 'updated',
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next)=>{
    const { id } = req.params;
    try{
      const customer = await service.delete(id);
      res.status(204).json({
        message: 'Customer deleted'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

