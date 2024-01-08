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
export { test, updateUser };
