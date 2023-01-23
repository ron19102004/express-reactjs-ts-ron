import jwt from "jsonwebtoken";

export class AuthGenerateTokenService {
    constructor() {}
    public generateToken= async (payload:JSON,secretOrPrivateKey:String,tokenLife:String):Promise<any>=>{
        const promisify = require("util").promisify;
        const sign = promisify(jwt.sign).bind(jwt);
        try {
            return await sign({ payload }, secretOrPrivateKey, {
                algorithm: "HS256",
                expiresIn: tokenLife,
            });
        } catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            // @ts-ignore
            return null;
        }
    }
}