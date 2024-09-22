import mongoose from "mongoose";

const connectdb=async()=>{
    try {//book
        //zqu8UJ3KnEEzJC52
        await mongoose.connect(process.env.mongo_url );
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error(err);
        
    }
}
export default connectdb