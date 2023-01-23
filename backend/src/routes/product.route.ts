import { ProductController } from '../controllers/product.controller';
import { Router } from 'express';
export class ProductRoute{
    private productController:ProductController;
    public route:Router;
    private path:string;
    constructor(){
        this.productController = new ProductController();
        this.route = Router();
        this.path = "/products"
        this.setRoute();
    }
    private setRoute = ():void =>{
        //@ts-ignore
        this.route.post(`${this.path}`,this.productController.create);
        //@ts-ignore
        this.route.get(`${this.path}`,this.productController.findAll);
        //@ts-ignore
        this.route.get(`${this.path}/:id`,this.productController.findById);
        //@ts-ignore
        this.route.get(`${this.path}/category/:titleURL`,this.productController.findByCategory);


    }
}