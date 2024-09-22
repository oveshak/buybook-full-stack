import { User } from "../model/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    // Ensure req.user is populated by authentication middleware
  

    const id = req.user.id; // Fetch the user ID from the authenticated request

    // Fetch the user from the database using the ID
    const user = await User.findById(id);

    // Check if the user exists and has the 'admin' role
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role == 'admin') {
      next(); // User is admin, proceed to the next middleware
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    console.error(error.stack); // Log the full error stack for debugging
    return res.status(500).json({ message: "Server error" });
  }
};
