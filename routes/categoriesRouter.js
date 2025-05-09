const express = require('express');
const CategoriesService = require('../service/categoryService.js');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res)=>{
  const categories = await service.categoriesList();
  res.json(categories);
});

router.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const products = await service.find(id);
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({
      message: 'Category not found'
    });
  }
});





module.exports = router;
