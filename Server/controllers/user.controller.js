import { errorHandler } from '../utils/error.js';
import User from './../models/user.model.js';

const test = (req, res) => {
  res.json({
    message: 'Api route is working',
  });
};
const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, 'you can only update your own account!'));

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.username,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('authToken');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};
const deleteUserAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const { password: pass, ...rest } = user._doc;
  res.status(200).json(rest);
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });
    return res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    next(error);
  }
};
const updateRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          role: req.body.role,
        },
      },
      { new: true }
    );
    res.status(200).json('User role has been updated!');
  } catch (error) {
    next(error);
  }
};

export {
  test,
  updateUser,
  deleteUser,
  getUser,
  listUsers,
  deleteUserAdmin,
  updateRole,
};
