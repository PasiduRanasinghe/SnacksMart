import User from "../models/user.model.js";
import bycrypt from "bcryptjs";

const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bycrypt.hashSync(password, 10);
  const user = new User({ userName, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json("User Created Successfully!");
  } catch (error) {
    next(error);
  }
};

export { signup };
