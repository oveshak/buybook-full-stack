import express from "express";
// Corrected spelling from "middelware" to "middleware"

import { addBook, deleteBook, getAllBooks, getBookById, getRecentlyAddedBooks, updateBook } from "../controller/book.controller.js";
import { Authenticated } from "../middelware/userAuth.js";
import { isAdmin } from "../middelware/isAdmin.js";


const router = express.Router();

// Route to add a book, only accessible by authenticated admins
router.post('/add', Authenticated,isAdmin, addBook);
router.put('/update/:id', Authenticated,isAdmin, updateBook);
router.delete('/:id', Authenticated,isAdmin, deleteBook);
router.get('/',  getAllBooks);
router.get('/get-recent-book',  getRecentlyAddedBooks);
router.get('/:id',  getBookById);


export default router;
