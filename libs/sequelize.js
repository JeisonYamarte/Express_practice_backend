const {Sequelize} = require('sequelize');

const {config} = require('../config/config');
const setupModels = require('../db/models');
// Initialize Sequelize with PostgreSQL connection

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(process.env.DATABASE_URL || URI, {
  dialect: 'postgres',
  logging: false,
  retry: {
    max: 5,
  },
  pool: {
    acquire: 20000
  }
});
setupModels(sequelize);



module.exports = sequelize;
