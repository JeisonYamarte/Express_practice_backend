
const { fi } = require('@faker-js/faker');
const {Model, DataTypes, Sequelize} = require('sequelize');

const {USER_TABLE} = require('./userModel'); // Import User model for association


const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name', // Maps to the 'last_name' column in the database
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^\d{10}$/, // Validates that the phone number is a 10-digit number
      len: [10, 15], // Validates that the phone number length is between 10 and 15 characters
    },
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING, // Optional field for customer address
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true, // Ensures that each user can only have one customer record
    field: 'user_id', // Maps to the 'user_id' column in the database
    reference:{
      model: USER_TABLE, // Refers to the 'users' table
      key: 'id', // The primary key in the 'users' table
    },
    onUpdate: 'CASCADE', // Update the customer record if the user ID changes
    onDelete: 'SET NULL', // Set the customer record's user ID to null if the user is deleted
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user' });
    // Define associations here
    // For example: this.hasMany(models.Order, { foreignKey: 'customerId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
