"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeRoute = void 0;
const size_controller_1 = require("../controllers/size.controller");
const express_1 = require("express");
class SizeRoute {
    constructor() {
        this.setRoute = () => {
            //@ts-ignore
            this.route.get(`${this.path}`, this.sizeController.findAll);
            //@ts-ignore
            this.route.delete(`${this.path}`, this.sizeController.delete);
            //@ts-ignore
            this.route.post(`${this.path}`, this.sizeController.create);
        };
        this.sizeController = new size_controller_1.SizeController();
        this.route = (0, express_1.Router)();
        this.path = "/size";
        this.setRoute();
    }
}
exports.SizeRoute = SizeRoute;
