import { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req: Request, res: Response) => {
  const { email, username, password, isActive } = req.body;
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    // For example, minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[\S]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      isActive: true,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in sign up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    let user;
    if (username || email) {
      // user can login using username or email with password.
      user = username
        ? await User.findOne({ username })
        : await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // user inactive
    if (user && !user.isActive) {
      return res.status(404).json({ message: "User is inactive" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error in log in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const revokedTokens: Set<string> = new Set();

export const logOut = async (req: Request, res: Response) => {
  try {
    // You can optionally perform additional actions here, such as logging the user out of other services or clearing any session data.
    // For a simple JWT-based authentication system, simply returning a success message is sufficient.
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    revokedTokens.add(token);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in log out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
