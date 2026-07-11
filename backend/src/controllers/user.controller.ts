import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt-ts"
import { checkFieldEmpty } from "../utils/functions";
import { generateAccessToken, removeAccessToken } from "../utils/generateAccessToken";


// SignUp Controller
export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (checkFieldEmpty(firstName) === false || checkFieldEmpty(lastName) === false || checkFieldEmpty(email) === false || checkFieldEmpty(password) === false) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    const userEmail = await User.findOne({email})
    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new User
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword
    })

    if (newUser) {
      await newUser.save()
      return res.status(200).json({
        success: true,
        message: {email, firstName, lastName},
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed to create user",
    });

  } catch (error) {
    next(error);
  }
};


// Login Controller
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // check if field empty
    if (
      checkFieldEmpty(email) === false ||
      checkFieldEmpty(password) === false
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    // First check if the user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    generateAccessToken(user.email, res);

    res.status(200).json({
      success: true,
      message: {email: user.email, firstName: user.firstName, lastName: user.lastName},
    })

  } catch (error) {
    next(error);
  }
};


// Logout Controller
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    removeAccessToken(res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}