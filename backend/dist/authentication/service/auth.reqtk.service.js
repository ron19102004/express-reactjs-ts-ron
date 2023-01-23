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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshTokenService = void 0;
const user_service_1 = require("../../services/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const auth_gtk_service_1 = require("./auth.gtk.service");
dotenv.config();
class AuthRefreshTokenService {
    constructor() {
        this.refreshToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) { // @ts-ignore
                return {
                    error: "Error with REFRESH TOKEN"
                };
            }
            let user = yield this.userService.findByRefreshToken(refreshToken);
            if (!user) { // @ts-ignore
                return {
                    error: "Error with find user"
                };
            }
            try {
                // @ts-ignore
                let decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                let token = yield this.generateToken.generateToken(
                // @ts-ignore
                decoded.payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);
                // @ts-ignore
                yield this.userService.updateRefreshToken(user.id, token);
                // @ts-ignore
                return {
                    message: "request token successful !!!.",
                    token: token,
                };
            }
            catch (error) {
                // @ts-ignore
                return {
                    error: `Error with : ${error}`
                };
            }
        });
        this.userService = new user_service_1.UserService();
        this.generateToken = new auth_gtk_service_1.AuthGenerateTokenService();
    }
}
exports.AuthRefreshTokenService = AuthRefreshTokenService;
