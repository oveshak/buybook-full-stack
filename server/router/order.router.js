import express from 'express'
const router = express.Router();
import { Authenticated } from "../middelware/userAuth.js";
import { getAllOrders, getUserOrders, placeOrder, updateOrder } from '../controller/order.controller.js';
import { isAdmin } from '../middelware/isAdmin.js';


router.post('/add',Authenticated,placeOrder)
router.get('/',Authenticated,getUserOrders)
router.get('/all',Authenticated,isAdmin,getAllOrders)
router.put('/:id',Authenticated,isAdmin,updateOrder)


export default router;