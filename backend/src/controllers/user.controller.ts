import { Request, Response } from "express";


// SignUp Controller
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("User signup request received:", {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {}
};


// Login Controller
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        console.log("User login request received:", { email, password });
    }
    catch (error) {

    }
}

// Logout Controller
export const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
  }
}