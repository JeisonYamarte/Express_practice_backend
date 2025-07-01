const bcrypt = require('bcrypt');
const {Model, DataTypes, Sequelize} = require('sequelize');
const { Hooks } = require('sequelize/lib/hooks');

const USER_TABLE = 'users';
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, // Ensures that each email is unique
    validate: {
      isEmail: true, // Validates that the email format is correct
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      foreignKey: 'userId',
      as: 'customer', // Alias for the association
    });
    // Define associations here
    // For example: this.hasMany(models.Order, { foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const password = bcrypt.hash(user.password, 10);
          user.password = await password; // Hash the password before saving

        },
      },
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
