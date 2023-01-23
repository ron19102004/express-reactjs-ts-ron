import { SizeController } from "../controllers/size.controller";
import { Router } from 'express';

 export class SizeRoute {
    private sizeController: SizeController;
    public route:Router;
    private path:string;
    constructor(){
        this.sizeController = new SizeController();
        this.route = Router();
        this.path = "/size";
        this.setRoute();
    }
    private setRoute = ():void => {
        //@ts-ignore
        this.route.get(`${this.path}`,this.sizeController.findAll);
        //@ts-ignore
        this.route.delete(`${this.path}`,this.sizeController.delete);
        //@ts-ignore
        this.route.post(`${this.path}`,this.sizeController.create);
    }

 }