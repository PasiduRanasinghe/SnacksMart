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
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/snacksmart-2ccf7.appspot.com/o/avatars%2F1706891285125user.png?alt=media&token=3f7d324c-8e39-49df-9ef3-c4279875e5cf',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);
userSchema.methods.validPassword = function (password) {
  return bycrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', userSchema);

export default User;
