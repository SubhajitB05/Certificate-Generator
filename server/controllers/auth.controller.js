import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/generateToken.js";

const handleRegisterUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check whether user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    // Generate JWT token
    const token = generateToken(user);
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (error) {}
};

export { handleLoginUser, handleRegisterUser };
