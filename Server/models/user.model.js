import mongoose from "mongoose";

new userschema = new mongoose.Schema({
    userName: {
        type : String,
        required: true,
        unique: true,

    },
    userEmail: {
        type : String,
        required: true,
        unique: true,

    },
    password: {
        type : String ,
        required: true, 
    }

}, {timestamps :true});

const User = mongoose.model(User, userschema);

export default User;