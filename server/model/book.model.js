import mongoose from "mongoose";

const bookShema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Book = mongoose.model('book', bookShema);