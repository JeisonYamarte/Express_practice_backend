const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

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

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: ['user']
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
}

module.exports = OrderService;
// This code defines the OrderService class for managing orders in the application.
