import passport from 'passport';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
  //validate
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
  const { password: pass, ...rest } = req.user._doc;
  res.status(200).json(rest);
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(26).slice(-8);
      const hashedPassword = bycrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        userName:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(26).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.logout();
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

const userRole = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ role: req.user.role });
  } else {
    next(errorHandler(401, 'UnAuthorized'));
  }
};

export { signup, google, login, logout };
