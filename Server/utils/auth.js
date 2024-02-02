import passport from 'passport';
import { errorHandler } from './error.js';

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next(errorHandler(401, 'Unauthorized. Users only.'));
    }
    req.user = user;
    return next();
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || user.role !== 'admin') {
      return next(errorHandler(401, 'Unauthorized. Admins only.'));
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export { isAdmin, isAuthenticated };
