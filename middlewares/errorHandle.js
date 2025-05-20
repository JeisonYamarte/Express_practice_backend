

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

module.exports = {logErrors, clientErrorHandler, boomErrorHandler};
