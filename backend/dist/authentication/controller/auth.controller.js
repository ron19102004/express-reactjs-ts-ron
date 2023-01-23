"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_login_service_1 = require("../service/auth.login.service");
const auth_reqtk_service_1 = require("../service/auth.reqtk.service");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let email = req.body.email || null;
            // @ts-ignore
            let password = req.body.password || null;
            let data = yield this.authLoginService.login(email, password);
            // @ts-ignore
            yield res.json(data);
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let refreshToken = req.body.refreshToken;
            let status = yield this.authRefreshTokenService.refreshToken(refreshToken);
            // @ts-ignore
            yield res.json(status);
        });
        this.authLoginService = new auth_login_service_1.AuthLoginService();
        this.authRefreshTokenService = new auth_reqtk_service_1.AuthRefreshTokenService();
    }
}
exports.AuthController = AuthController;
