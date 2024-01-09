import mongoose from 'mongoose';

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
    avatar: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/snacksmart-2ccf7.appspot.com/o/avatars%2F1704812324508pngegg.png?alt=media&token=d2b0a3a3-79f3-4479-bd15-5a9979f6d1ee',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
