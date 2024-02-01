import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);
userSchema.methods.validPassword = function (password) {
  return bycrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', userSchema);

export default User;
