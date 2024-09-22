import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";
//put book to cart
export const addToCart = async (req, res) => {
    try {
      const { bookId } = req.body;
  
      // Validate if bookId is provided
      if (!bookId) {
        return res.status(400).json({ msg: "Please enter bookId" });
      }
  
      // Find the book by its ID
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      // Check if the user has already added this book to their cart
      if (req.user.cart.includes(bookId)) {
        return res.status(400).json({ msg: "This book is already in your cart" });
      }
  
      // Add the book to the user's cart
      req.user.cart.push(bookId);
      await req.user.save();
  
      // Populate the user's cart to return detailed book info
      const updatedUser = await User.findById(req.user.id).populate('cart');
  
      res.json({ msg: "Book added to cart successfully", updatedUser });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };
  
  //remove book from cart
  export const removeFromCart = async (req, res) => {
    try {
      const { bookId } = req.body;
  
      // Validate if bookId is provided
      if (!bookId) {
        return res.status(400).json({ msg: "Please enter bookId" });
      }
  
      // Find the user by their ID
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Check if the book is in the user's cart
      if (!user.cart.includes(bookId)) {
        return res.status(400).json({ msg: "This book is not in your cart" });
      }
  
      // Remove the book from the user's cart
      user.cart = user.cart.filter(cartItem => cartItem.toString() !== bookId);
      await user.save();
  
      // Populate the user's cart to return updated list with detailed book info
      const updatedUser = await User.findById(req.user.id).populate('cart');
  
      res.json({ msg: "Book removed from cart successfully",  updatedUser });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };

  //get cart for current user
  export const getCart = async (req, res) => {
    try {
      // Find the user by their ID and populate the 'cart' field with book details
      const user = await User.findById(req.user.id).populate('cart');
      
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const cart =user.cart.reverse()
      // Return the user's cart with detailed book information
      res.json({ cart});
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };
  