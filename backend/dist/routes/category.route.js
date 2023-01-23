"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const category_controller_1 = require("../controllers/category.controller");
const express_1 = require("express");
class CategoryRoute {
    constructor() {
        this.setRoute = () => {
            //@ts-ignore
            this.route.get(`${this.path}`, this.categoryController.findAll);
            //@ts-ignore
            this.route.get(`${this.path}/:id`, this.categoryController.findById);
            //@ts-ignore
            this.route.post(`${this.path}`, this.categoryController.create);
            //@ts-ignore
            this.route.delete(`${this.path}`, this.categoryController.delete);
            //@ts-ignore
            this.route.put(`${this.path}`, this.categoryController.update);
        };
        this.categoryController = new category_controller_1.CategoryController();
        this.route = (0, express_1.Router)();
        this.path = "/categories";
        this.setRoute();
    }
}
exports.CategoryRoute = CategoryRoute;
