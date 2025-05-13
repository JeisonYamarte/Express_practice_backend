const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const validationResult = schema.validate(data, {abortEarly: false});
    if (validationResult.error) {
      next(boom.badRequest(validationResult.error));
    }
    next();
  };
}

module.exports = validatorHandler;
