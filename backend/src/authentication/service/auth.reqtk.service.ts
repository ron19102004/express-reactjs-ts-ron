import {UserService} from "../../services/user.service";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AuthGenerateTokenService } from './auth.gtk.service';
dotenv.config();

export class AuthRefreshTokenService{
    private userService:UserService;
    private generateToken:AuthGenerateTokenService;
    constructor() {
        this.userService = new UserService();
        this.generateToken = new AuthGenerateTokenService();
    }
    public refreshToken=async(refreshToken:string):Promise<any>=>{
        if (!refreshToken) { // @ts-ignore
            return {
                error: "Error with REFRESH TOKEN"
            };
        }
        let user = await this.userService.findByRefreshToken(refreshToken);
        if (!user) { // @ts-ignore
            return {
                error:"Error with find user"
            };
        }
        try {
            // @ts-ignore
            let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            let token = await this.generateToken.generateToken(
                // @ts-ignore
                decoded.payload,
                process.env.REFRESH_TOKEN_SECRET,
                process.env.REFRESH_TOKEN_LIFE,
            )
            // @ts-ignore
            await this.userService.updateRefreshToken(user.id,token);
            // @ts-ignore
            return {
                message: "request token successful !!!.",
                token: token,
            };
        } catch (error) {
            // @ts-ignore
            return {
                error:`Error with : ${error}`
            };
        }
    }
}