import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bycrypt.hashSync(password, 10);
  const user = new User({ userName, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json('User Created Successfully!');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User Not Found!'));
    const validPassword = bycrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {}
};

export { signup, login };
