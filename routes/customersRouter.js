const express = require('express');

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
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newCustomer,
    });
  }
);

router.put('/:id',
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

