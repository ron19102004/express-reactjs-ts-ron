import jwt from "jsonwebtoken";
import {NextFunction} from "express";
require("dotenv").config();
export class AuthMiddleware {
    constructor() {}
    public verifyToken = (req:Request, res:Response, next:NextFunction):void => {
        // @ts-ignore
        let authHeader = req.headers("Authorization");
        let token = authHeader && authHeader.split(' ')[1];
        if (!token) { // @ts-ignore
            return res.status(401);
        }
        try {
            // @ts-ignore
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            next();
        } catch (error) {
            console.log(error);
            // @ts-ignore
            return res.status(403);
        }
    };
}
