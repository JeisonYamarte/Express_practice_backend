const express = require('express');

const CategoriesService = require('../service/categoryService.js');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('../schemas/categoriesSchema.js');
const validatorHandler = require('../middlewares/validatorHandler.js');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res, next)=>{
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next)=>{
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next)=>{
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newCategory,
    });
  }
  catch (error) {
    next(error);
  }
});

router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next)=>{
  const body = req.body;
  const { id } = req.params;
  try {
    const category = await service.update(id, body);
    res.json({
      message: 'updated',
      data: category,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next)=>{
  const { id } = req.params;
  try {
    const category = await service.delete(id);
    res.json({
      message: 'deleted',
      data: category,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
