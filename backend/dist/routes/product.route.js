"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const product_controller_1 = require("../controllers/product.controller");
const express_1 = require("express");
class ProductRoute {
    constructor() {
        this.setRoute = () => {
            //@ts-ignore
            this.route.post(`${this.path}`, this.productController.create);
            //@ts-ignore
            this.route.get(`${this.path}`, this.productController.findAll);
            //@ts-ignore
            this.route.get(`${this.path}/:id`, this.productController.findById);
            //@ts-ignore
            this.route.get(`${this.path}/category/:titleURL`, this.productController.findByCategory);
        };
        this.productController = new product_controller_1.ProductController();
        this.route = (0, express_1.Router)();
        this.path = "/products";
        this.setRoute();
    }
}
exports.ProductRoute = ProductRoute;
