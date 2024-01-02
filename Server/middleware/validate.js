import { errorHandler } from '../utils/error.js';

const validate = (schema) => async (req, res, next) => {
  const result = await schema.validate(req.body);

  if (result.error) {
    return next(errorHandler(400, result.error.details[0].message));
  }

  next();
};

export default validate;
