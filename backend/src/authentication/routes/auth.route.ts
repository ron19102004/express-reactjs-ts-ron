import {Router} from "express";
import { AuthController } from "../controller/auth.controller";

export class AuthRoute{
    private authController:AuthController;
    public route:Router;
    private readonly path:string;
    constructor() {
        this.authController = new AuthController();
        this.path="/auth"
        this.route = Router();
        this.setRoute();
    }
    private setRoute=():void=>{
        // @ts-ignore
        this.route.post(`${this.path}/login`,this.authController.login);
        // @ts-ignore
        this.route.post(`${this.path}/refresh-token`,this.authController.refreshToken);
    }
}