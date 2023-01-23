import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoute{
    private userController:UserController;
    public route:Router;
    private path:string;
    constructor(){
        this.userController = new UserController();
        this.path = "/users";
        this.route = Router();
        this.setRoute();
    }
    public setRoute = ():void => {
        //@ts-ignore
        this.route.get(`${this.path}`,this.userController.findAll); 
        //@ts-ignore
        this.route.post(`${this.path}`,this.userController.create); 
        //@ts-ignore     
        this.route.get(`${this.path}/:id`,this.userController.findById);
        //@ts-ignore
        this.route.get(`${this.path}/page/:page`,this.userController.pagination);
        //@ts-ignore
        this.route.delete(`${this.path}`,this.userController.delete);
    }
}