import mongoose from "mongoose";

const orderShema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'book'
    },
   
    orderStatus:{
        type:String,
        enum:['Order Placed','Out for delivery','delivered','cancelled'],
        required:true,
        default:'Order Placed'
    }
},{timestamps:true});

export const Order = mongoose.model('order', orderShema);