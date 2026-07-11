import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const testToken = req.cookies.access_token;
        if (testToken) {
            jwt.verify(testToken, env.jwtKey, (err: Error | null) => {
                if(err) {
                    res.status(401).json({
                        success: false,
                        message: "Unauthorized"
                    })
                } else {
                    next()
                }
            })
        } else {
            res.status(401).json({
              success: false,
              message: "Unauthorized",
            });
        }
    }catch(error) {
        next(error)
    }
}