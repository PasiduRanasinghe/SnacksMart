import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

//connect to mongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

//initialize the app
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

//passport js

app.use(passport.initialize());

//redirect routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);

//middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
