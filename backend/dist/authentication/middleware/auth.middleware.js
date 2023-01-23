"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class AuthMiddleware {
    constructor() {
        this.verifyToken = (req, res, next) => {
            // @ts-ignore
            let authHeader = req.headers("Authorization");
            let token = authHeader && authHeader.split(' ')[1];
            if (!token) { // @ts-ignore
                return res.status(401);
            }
            try {
                // @ts-ignore
                let decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                console.log(decoded);
                next();
            }
            catch (error) {
                console.log(error);
                // @ts-ignore
                return res.status(403);
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
