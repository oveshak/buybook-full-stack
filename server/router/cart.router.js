import express from 'express'
const router = express.Router();
import { Authenticated } from "../middelware/userAuth.js";
import { addToCart, getCart, removeFromCart } from '../controller/cart.controller.js';

router.post('/add',Authenticated,addToCart)
router.post('/',Authenticated,removeFromCart)
router.get('/getcart',Authenticated,getCart)
export default router;