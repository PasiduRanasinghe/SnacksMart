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
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser-avatar&psig=AOvVaw39ZHfxG58OnycRAh83_gYg&ust=1704898415455000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNjvx9jH0IMDFQAAAAAdAAAAABAE',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
