const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const costumersRouter = require('./customersRouter');
const categoriesRouter = require('./categoriesRouter');

async function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', costumersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
