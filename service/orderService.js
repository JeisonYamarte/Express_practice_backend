const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const UsersService = require('../service/usersService')

const service = new UsersService;

class OrderService {
  constructor() {
    // Initialize any properties or dependencies if needed
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    if (!newItem) {
      throw boom.badRequest('Item could not be added to the order');
    }
    return newItem;
  }

  //packege data with jwt and body
  async packageData(id, body){
    const user = await service.findOne(id);

    if(user.dataValues.customer === null){
      throw boom.notFound('customer no associate');
    }

    body.customerId = user.dataValues.customer.dataValues.id;

    return body;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
        association: 'customer',
        include: ['user']
      },
      'items'
    ],

    });
    return orders;
  }

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
      ]
    });
    if (!orders || orders.length === 0) {
      throw boom.notFound('No orders found for this user');
    }
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: [{
          association: 'user',
          attributes: { exclude: ['password', 'recoveryToken'] }
        }]
      },
      'items'
    ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  async verifyOrder(orderId, userId) {
    const order = await this.findOne(orderId);
    if (order.customer.user.id !== userId) {
      throw boom.unauthorized('You are not authorized to access this order');
      return false;
    } else {
      return true;
    }
  }
}

module.exports = OrderService;
// This code defines the OrderService class for managing orders in the application.
