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
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ id: id });
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ email: email });
        });
        this.create = (user) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.save(user);
        });
        this.pagination = (skip, take) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.pagination(skip, take);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(id);
        });
        this.updateRefreshToken = (id, token) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(id, { refreshToken: token });
        });
        this.findByRefreshToken = (token) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneBy({ refreshToken: token });
        });
        this.userRepository = new user_repository_1.UserRepository().getRepository();
    }
}
exports.UserService = UserService;
