const {Strategy, ExtractJwt} = require('passport-jwt');
const {config} = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = JwtStrategy
