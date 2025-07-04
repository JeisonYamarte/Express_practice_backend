const express = require('express');
const passport = require('passport');


const ProductsService = require('../service/productsService.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const {checkRoles} = require('../middlewares/authHandler.js')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/productSchema.js');

const router = express.Router();
const service = new ProductsService();


router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next)=>{
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);

    } catch (error) {
      next(error);
    }
});



router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next)=>{
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    const body = req.body;
    const { id } = req.params;
    try{
      const product = await service.update(id, body);
      res.json({
        message: 'updated',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    const { id } = req.params;
    try{
      const product = await service.delete(id);
      res.json({
        message: 'deleted',
        data: product,
      });
    } catch (error) {
      next(error);
    }

  }
);


module.exports = router;
