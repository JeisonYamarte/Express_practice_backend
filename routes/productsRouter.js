const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res)=>{
  const products = [];
  const {size} = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
    });

  }
  res.json(products);
});


router.get('/filter', (req, res)=>{
  res.send('Soy un filter');
});

router.get('/:id', (req, res)=>{
  const { id } = req.params;
  res.json({
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    id
  });
});


module.exports = router;
