const express = require('express');
const passport = require('passport');

const OrdersService = require('../service/orderService');

const validatorHandler = require('../middlewares/validatorHandler');
const {checkRoles} = require('../middlewares/authHandler')

const {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema
} = require('../schemas/ordersSchema');

const router = express.Router();
const service = new OrdersService();

// Create a new order
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const body = req.body;
      const data = await service.packageData(userId, body)
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

// Add an item to an order
router.post('/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);


// Get all orders
router.get('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}
);


// Get a specific order by ID
router.get('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.sub;
      // Verify if the user is authorized to access this order
      const verify = await service.verifyOrder(id, req.user.sub);
      if (!verify) {
        return res.status(403).json({ message: 'You are not authorized to access this order' });
      }
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Update an order by ID
router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const verify = await service.verifyOrder(id, req.user.sub);
      if (!verify) {
        return res.status(403).json({ message: 'You are not authorized to access this order' });
      }
      const updatedOrder = await service.update(id, body);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

// Delete an order by ID
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const verify = await service.verifyOrder(id, req.user.sub);
      if (!verify) {
        return res.status(403).json({ message: 'You are not authorized to access this order' });
      }
      await service.delete(id);
      res.status(204).json('deleted');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
// This code defines the routes for managing orders in an Express application.
