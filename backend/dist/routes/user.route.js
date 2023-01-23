"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoute {
    constructor() {
        this.setRoute = () => {
            //@ts-ignore
            this.route.get(`${this.path}`, this.userController.findAll);
            //@ts-ignore
            this.route.post(`${this.path}`, this.userController.create);
            //@ts-ignore     
            this.route.get(`${this.path}/:id`, this.userController.findById);
            //@ts-ignore
            this.route.get(`${this.path}/page/:page`, this.userController.pagination);
            //@ts-ignore
            this.route.delete(`${this.path}`, this.userController.delete);
        };
        this.userController = new user_controller_1.UserController();
        this.path = "/users";
        this.route = (0, express_1.Router)();
        this.setRoute();
    }
}
exports.UserRoute = UserRoute;
