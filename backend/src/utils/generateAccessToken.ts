import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Response } from "express";

export const generateAccessToken = (id: string, email: string, res: Response) => {
  const token = jwt.sign({ id, email }, env.jwtKey, { expiresIn: "1h" });
  res.cookie("access_token", token, {httpOnly: true, secure: false, sameSite: "lax", maxAge: 3600000}) // 1hr
};

export const removeAccessToken = (res: Response) => {
    res.clearCookie("access_token")
}
