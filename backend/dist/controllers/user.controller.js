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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = require("../models/user.model");
class UserController {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users = yield this.userService.findAll();
            let data = [];
            users.forEach((user) => {
                data.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                });
            });
            // @ts-ignore
            res.status(200).json({
                message: "full information users ",
                data: {
                    length: users.length,
                    users: data
                }
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let { name, email, role, avatar, password } = req.body;
            if (!name || !email || !password) {
                // @ts-ignore
                res.status(404).json({
                    message: "error create user !!!"
                });
                return;
            }
            let userEmail = yield this.userService.findByEmail(email);
            if (userEmail) {
                //@ts-ignore
                res.status(403).json({
                    message: "error email is exist !!!"
                });
                return;
            }
            let user = new user_model_1.UserModel(name, email, role, avatar, password);
            yield this.userService.create(user);
            // @ts-ignore
            res.status(200).json({
                message: "success create user",
                user: user
            });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let id = parseInt(req.params.id) || null;
            let user = yield this.userService.findById(id);
            // @ts-ignore
            res.status(200).json({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                }
            });
        });
        this.pagination = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let page = parseInt(req.params.page) || 0;
            // @ts-ignore
            let users_data = yield this.userService.findAll();
            let length = users_data.length;
            let take = 7;
            let numPage = Math.floor(length / take);
            (numPage * take < length) ? numPage++ : "";
            let skip = (page * take) - take;
            let users = yield this.userService.pagination(skip, take);
            let data = [];
            users.forEach((user) => {
                data.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                });
            });
            //@ts-ignore
            res.status(200).json({
                pages: {
                    total_pages: numPage,
                    page_current: page
                },
                data: {
                    length: data.length,
                    users: data
                }
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let id = parseInt(req.body.id) || 0;
            if (!id)
                return;
            yield this.userService.delete(id);
            //@ts-ignore
            res.status(200).json({
                message: 'User deleted successfully'
            });
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
