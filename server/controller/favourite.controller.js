import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";

export const addFavoritebook = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Validate the presence of bookId
    if (!bookId) {
      return res.status(400).json({ msg: "Please enter bookId" });
    }

    // Find the book by its ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Check if the user has already added this book to their favorites
    if (req.user.favouriteBook.includes(bookId)) {
      return res.status(400).json({ msg: "This book is already in your favorites" });
    }

    // Add the book to the user's favorites
    req.user.favouriteBook.push(bookId);
    await req.user.save();

    // Populate the user's favorites field to return detailed book info
    const updatedUser = await User.findById(req.user.id).populate('favouriteBook');

    res.json({ msg: "Book added to favorites successfully", updatedUser });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


//delete favorite book
export const removeFavoritebook = async (req, res) => {
    try {
      const { bookId } = req.body;
  
      // Validate if bookId is provided
    //   if (!bookId) {
    //     return res.status(400).json({ msg: "Please enter bookId" });
    //   }
  
      // Find the user by their ID
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Check if the book is in the user's favorites
      if (!user.favouriteBook.includes(bookId)) {
        return res.status(400).json({ msg: "This book is not in your favorites" });
      }
  
      // Remove the book from the user's favorites
      user.favouriteBook= user.favouriteBook.filter(favorite => favorite.toString() !== bookId);
      await user.save();
  
      // Populate favorites to return updated list with detailed book info
      const updatedUser = await User.findById(req.user.id).populate('favouriteBook');
  
      res.json({ msg: "Book removed from favorites successfully",  updatedUser });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };

  //get favorite books for current user
  export const getFavoriteBooks = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('favouriteBook');
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user.favouriteBook);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  };
  