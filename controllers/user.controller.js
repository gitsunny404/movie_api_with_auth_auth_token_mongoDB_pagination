import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const saltRounds = 10;
import { generateToken } from "../middlewares/webtokens.middleware.js";

export async function CreateUser(req, res) {
  try {
    const plainPassword = req.body.password;

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Check if the username is already taken
    const existingUserUsername = await User.findOne({
      username: req.body.username,
    });
    const existingUserEmail = await User.findOne({ email: req.body.email });
    const existingUserPhone = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (existingUserUsername) {
      return res.status(400).json({
        status: "failed",
        error: "Username already exists",
        message: "Please choose a different username",
      });
    }
    if (existingUserEmail) {
      return res.status(400).json({
        status: "failed",
        error: "Email already exists",
        message: "Please choose a different email",
      });
    }
    if (existingUserPhone) {
      return res.status(400).json({
        status: "failed",
        error: "phone already exists",
        message: "Please choose a different phone",
      });
    }

    // Create a new user with the hashed password
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json({
      status: "success",
      id: user.id,
      name: user.name,
      message: "User created successfully !!!",
    });
  } catch (error) {
    // console.error("Error creating user:", error.message);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
      message: error.message,
    });
  }
}

export async function GetUser(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    // console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function GetUserByID(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: `User with ID ${req.params.id} not found`,
      });
    }
    res.json(user);
  } catch (error) {
    // console.error("Error fetching user by ID:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

export async function UpdateUserByID(req, res) {
  try {
    // Check if the updated username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser._id != req.params.id) {
      return res.status(400).json({
        error: "Username already exists. Please choose a different username.",
      });
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }

    // Proceed with updating the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: `User not found with id ${req.params.id}` });
    }

    res.json({
      status: "success",
      id: user.id,
      message: "User updated successfully!!!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

export async function DeleteUserByID(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    // console.error("Error deleting user by ID:", error.message);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
      message: error.message,
    });
  }
}

export async function LoginUser(req, res) {
  try {
    const { username, email, phoneNumber, password } = req.body;

    // Check if the user exists based on username, email, or phone
    const user = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
        message: "Incorrect password",
      });
    }

    // Password is correct, user is authenticated
    const token = generateToken(user); // Generate token

    // Password is correct, user is authenticated
    res.status(200).json({
      status: "success",
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
