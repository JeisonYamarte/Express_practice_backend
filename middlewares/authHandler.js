const boom = require('@hapi/boom');
const {config} = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next(); // API key is valid, proceed to the next middleware or route handler
  }else {
    next(boom.unauthorized('API key is invalid'));
  }
}

module.exports = {checkApiKey};
