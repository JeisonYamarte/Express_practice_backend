const express = require('express');


const ProductsService = require('../service/productsService.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema.js');

const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res)=>{
  const products = await service.find();
  res.json(products);
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
  validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct,
    });
});

router.put('/:id',
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
  validatorHandler(getProductSchema, 'params'),
  async (req, res)=>{
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({
      message: 'deleted',
      data: product,
    });

  }
);


module.exports = router;
