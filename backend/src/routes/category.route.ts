import { CategoryController } from '../controllers/category.controller';
import { Router } from 'express';

export class CategoryRoute {
    private categoryController:CategoryController;
    public route:Router;
    private path:string;
    constructor(){
        this.categoryController = new CategoryController();
        this.route = Router();
        this.path = "/categories";
        this.setRoute();
    }
    public setRoute = ():void => {
        //@ts-ignore
        this.route.get(`${this.path}`,this.categoryController.findAll);
        //@ts-ignore
        this.route.get(`${this.path}/:id`,this.categoryController.findById);
        //@ts-ignore
        this.route.post(`${this.path}`,this.categoryController.create);
        //@ts-ignore
        this.route.delete(`${this.path}`,this.categoryController.delete);
        //@ts-ignore
        this.route.put(`${this.path}`,this.categoryController.update);
    
    }
}