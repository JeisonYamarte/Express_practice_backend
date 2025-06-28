const express = require('express');
const passport = require('passport');

const {getCustomerSchema, createCustomerSchema, updateCustomerSchema} = require('../schemas/customersSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const CustomersService = require('../service/customersService');

const router = express.Router();
const service = new CustomersService();

router.get('/',async (req, res)=>{
  const customer = await service.find();
  res.json(customer);
});

router.get('/:id',
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
    const body = req.body;
    try{
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

