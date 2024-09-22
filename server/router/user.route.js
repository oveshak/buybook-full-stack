import express from "express";
import { getUserProfile, loginUser, registerUser, updateUserAddress } from "../controller/user.controller.js";
import { Authenticated } from "../middelware/userAuth.js";
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/userinfo',Authenticated,getUserProfile)
router.put('/updateUser',Authenticated,updateUserAddress)

export default router