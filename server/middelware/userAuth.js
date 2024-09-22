import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

export const Authenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    // Check if the Authorization header is missing
    if (!authHeader) {
      return res.status(401).json({ message: "Please log in first" });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found, please log in" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.secret_key);

    const userId = decoded.id;

    // Find the user by decoded ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Attach user information to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);

    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
