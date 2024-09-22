import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Registration
export const registerUser = async (req, res) => {
    try {
      const { username, email, password, address } = req.body;
  
      // Check if all required fields are present
      if (!email || !password || !address || !username) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      // Check if username length is more than 5 characters
      if (username.length < 5) {
        return res.status(400).json({ msg: "Username should be at least 5 characters long" });
      }
  
      // Check if username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ msg: "Username already exists" });
      }
  
      // Check if password length is more than 6 characters
      if (password.length <= 6) {
        return res.status(400).json({ msg: "Password should be at least 6 characters long" });
      }
  
      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "email already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        address
      });
  
      await newUser.save();
  
      res.json({ msg: "User registered successfully", user: newUser });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
  

  //login with user
  export const loginUser = async (req, res) => {
    try {
      const { username, password ,email} = req.body;
  
      // Check if all required fields are present
      if ( !password || !email) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      // Check if user exists
      const user = await User.findOne({ email,username });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
  
      // Return JWT token and set it in cookies
      const token = jwt.sign({ id: user._id ,role:user.role }, process.env.secret_key, { expiresIn: '1h' });
  
    //   res.cookie('token', token, { expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hour expiry time for the token
  
      return res.status(200).json({ msg: "User logged in successfully", user ,role:user.role ,"token":token });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  };
  
//get user information
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };

  //update user address
  export const updateUserAddress = async (req, res) => {
    try {
      const { address } = req.body;

      // Check if all required fields are present
      

      const updatedUser = await User.findByIdAndUpdate(req.user.id, { address }, { new: true });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };

//update user password