import { errorHandler } from './error.js';

const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(errorHandler(401, 'Unauthorized Users only'));
};
const isAdmin = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  return next(401, 'Unauthorized admin only');
};

export { isAdmin, isAuthenticated };
