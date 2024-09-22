import { populate } from "dotenv";
import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";

export const placeOrder = async (req, res) => {
    try {
      const userId = req.user.id;  // Get the authenticated user ID
      
      // Retrieve the user's cart and populate the books
      const user = await User.findById(userId).populate('cart');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the cart is empty
      if (user.cart.length === 0) {
        return res.status(400).json({ message: "Your cart is empty" });
      }
  
      // Create an order for each book in the cart
      for (const book of user.cart) {
        // Check if the book object is properly populated
        if (!book._id) {
          return res.status(400).json({ message: `Book ${book.title || 'Unknown'} does not exist or is invalid.` });
        }
  
        const newOrder = new Order({
          user: userId,
          book: book._id,  // Use the book's ObjectId
          
        });
  
        // Save the order to the database
        const savedOrder = await newOrder.save();
  
        // Add the order to the user's order history
        await User.findByIdAndUpdate(userId, {
          $push: { orders: savedOrder._id }
        });
      }
  
      // Clear the user's cart after placing the order
      user.cart = [];
      await user.save();
  
      // Return success response
      return res.json({
        status: "Success",
        message: "Order placed successfully",
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while placing the order" });
    }
  };

//get order for particular user
export const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;  // Ensure user ID is obtained from the authenticated user
  
      // Find all orders where the user's ID matches the order's user ID
      const orders = await Order.find({ user: userId })
        .populate({ path: 'book' });  // Populate the book field in the order
  
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
  
  

  //get all order
  export const getAllOrders = async (req, res) => {
    try {
      // Find all orders in the database
      const orders = await Order.find()
        .populate({ path: 'book'}) .populate({path:'user'});  // Populate the book field in the order
  
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

//update order admin
export const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
    
  
      // Validate the order ID
      if (!id) {
        return res.status(400).json({ message: "Please provide an order ID" });
      }
  
      // Find the order by its ID
      const order = await Order.findByIdAndUpdate(id, {orderStatus:req.body.orderStatus}, { new: true });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.json({ message: "Order updated successfully", order });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while updating the order" });
    }
  }

//delete order