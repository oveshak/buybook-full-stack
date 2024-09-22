import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.port || 3000;
const hostname='http://127.0.0.1:'
import dotenv from 'dotenv'
import connectdb from './utils/db.js';
dotenv.config({})

//router import
import userRoute from './router/user.route.js'
import bookRoute from './router/book.route.js'
import favouriteRoute from './router/favouriteBook.route.js';
import cartRoute from './router/cart.router.js';
import orderRoute from './router/order.router.js';

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173', // replace with your frontend application URL
    credentials: true
    
}
app.use(cors(corsOptions));

//router
app.use('/user',userRoute)
app.use('/book',bookRoute)
app.use('/favourite',favouriteRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.listen(port, () => {
    connectdb()
  console.log(`${hostname}${port}`)
})
