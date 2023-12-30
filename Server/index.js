import  dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.listen(3000, () =>{
        console.log("Server is running on port 3000");
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
