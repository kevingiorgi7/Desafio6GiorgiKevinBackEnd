import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    isAdmin:{
        type: Boolean,
        default:false
    }
});

export const userModel = mongoose.model("user", userSchema);