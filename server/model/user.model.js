import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true,
        default:'user'
    }, 
    favouriteBook:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'book'
    }],
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'book'
    }],
    order:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'order'
    }]
},{timestamps:true});

export const User = mongoose.model('user', userSchema);