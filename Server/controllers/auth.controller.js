import passport from 'passport';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
  //validate
  const { userName, email, password, address, phoneNumber } = req.body;
  console.log(password);

  try {
    const hashedPassword = bycrypt.hashSync(password, 10);
    const user = new User({
      userName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    });
    await user.save();
    res.status(201).json('User Created Successfully!');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, userWithToken, info) => {
      if (err) {
        return next(err);
      }
      if (!userWithToken) {
        return res
          .status(401)
          .json({ message: 'Incorrect email or password.' });
      }

      const { user, token } = userWithToken;

      const { password: pass, ...rest } = user._doc;

      res.cookie('authToken', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.status(200).json(rest);
    }
  )(req, res, next);
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
  res.clearCookie('authToken');
  res.status(200).json('Logout successful');
};

const userRole = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ role: req.user.role });
  } else {
    next(errorHandler(401, 'UnAuthorized'));
  }
};

const authenticate = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const { role, ...rest } = user._doc;
  res.status(200).json({ role: role });
};

export { signup, google, login, logout, authenticate };
