import { Book } from "../model/book.model.js";


//add book admin
export const addBook = async (req, res) => {
    try {
      const { title, author, price, image,description,language} = req.body;
  
      // Check if all required fields are present
      if (!title || !author || !price || !image || !description || !language) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      const newBook = new Book({
        title,
        author,
        price,
        image,
        description,
        language
      });
  
      await newBook.save();
  
      res.json({ msg: "Book added successfully", book: newBook });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };

//update book with admin
export const updateBook = async (req, res) => {
  try {
    const { title, author, price, image, description, language } = req.body;

    // Optional: Validate that required fields are provided
   

    // Find the book by ID and update with new data
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        price,
        image,
        description,
        language
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Respond with success and the updated book
    res.json({ msg: "Book updated successfully", book: updatedBook });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

//delete book from admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json({ msg: "Book deleted successfully", book });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};



//get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt
      : -1 });
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//get recently added books
export const getRecentlyAddedBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt
      : -1 }).limit(4);
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//get book by id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};