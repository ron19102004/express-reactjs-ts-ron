"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthLoginService = void 0;
const user_service_1 = require("../../services/user.service");
const auth_gtk_service_1 = require("./auth.gtk.service");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class AuthLoginService {
    constructor() {
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.findByEmail(email);
            if (!user)
                return {
                    status: "error",
                    message: "User not found"
                };
            if (user.password !== password)
                return {
                    status: "error",
                    message: "password is incorrect"
                };
            let dataForAccessToken = {
                //@ts-ignore
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avt: user.avatar,
            };
            let accessToken = this.authGenerateTokenService.generateToken(dataForAccessToken, 
            // @ts-ignore
            process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);
            if (!accessToken) {
                return {
                    message: "Generate access token is not successful.Try again!"
                };
            }
            let refreshToken = yield this.authGenerateTokenService.generateToken(dataForAccessToken, 
            // @ts-ignore
            process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);
            if (user.refreshToken) {
                refreshToken = user.refreshToken;
            }
            else {
                //@ts-ignore
                yield this.userService.updateRefreshToken(user.id, refreshToken);
            }
            return {
                message: "login successfully !!!.",
                jwt: {
                    payload: dataForAccessToken,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                user: user
            };
        });
        this.userService = new user_service_1.UserService();
        this.authGenerateTokenService = new auth_gtk_service_1.AuthGenerateTokenService();
    }
}
exports.AuthLoginService = AuthLoginService;
