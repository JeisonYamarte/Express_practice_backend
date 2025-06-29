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

function checkAdminRole(req, res, next) {
  const user = req.user;

  if (user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    next(boom.forbidden('You do not have permission to perform this action'));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;

    if (roles.includes(user.role)) {
      next(); // User has one of the required roles, proceed to the next middleware or route handler
    } else {
      next(boom.unauthorized('You do not have permission to perform this action'));
    }
  };
}

module.exports = {checkApiKey, checkAdminRole, checkRoles};
