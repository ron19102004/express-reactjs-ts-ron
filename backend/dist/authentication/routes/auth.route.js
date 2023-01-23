"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
class AuthRoute {
    constructor() {
        this.setRoute = () => {
            // @ts-ignore
            this.route.post(`${this.path}/login`, this.authController.login);
            // @ts-ignore
            this.route.post(`${this.path}/refresh-token`, this.authController.refreshToken);
        };
        this.authController = new auth_controller_1.AuthController();
        this.path = "/auth";
        this.route = (0, express_1.Router)();
        this.setRoute();
    }
}
exports.AuthRoute = AuthRoute;
