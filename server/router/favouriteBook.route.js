import express from "express";
const router = express.Router();
import { Authenticated } from "../middelware/userAuth.js";
import { addFavoritebook, getFavoriteBooks, removeFavoritebook } from "../controller/favourite.controller.js";

router.post('/add', Authenticated,addFavoritebook);
router.post('/:id', Authenticated,removeFavoritebook);
router.get('/', Authenticated,getFavoriteBooks);

export default router;