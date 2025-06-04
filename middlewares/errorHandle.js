const {validationError} = require('sequelize');
const boom = require('@hapi/boom');

function logErrors (err, req, res, next) {
  console.log('logErrors');

  console.error(err.stack);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
  console.log('clientErrorHandler');

   console.error(err.stack);
  res.status(500).send({
    message: err.message,
    stack: err.stack,
  });
  next(err);
}

function boomErrorHandler (err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function sequelizeErrorHandler (err, req, res, next) {
  console.log('sequelizeErrorHandler');
  if (err instanceof validationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors,
    });
  } else {
    next(err);
  }
}

module.exports = {logErrors, clientErrorHandler, boomErrorHandler, sequelizeErrorHandler};
