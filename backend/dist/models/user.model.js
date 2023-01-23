"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const typeorm_1 = require("typeorm");
const product_model_1 = require("./product.model");
let UserModel = class UserModel {
    constructor(name, email, role, avatar, password) {
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
        this.avatar = avatar;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "name",
        type: "varchar",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "password",
        type: "varchar",
        length: 20,
        nullable: false,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "email",
        type: "varchar",
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "role",
        type: "varchar",
        length: 20,
        default: "user",
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "avatar",
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "refreshToken",
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_model_1.ProductModel, (product) => product.user),
    __metadata("design:type", Object)
], UserModel.prototype, "product", void 0);
UserModel = __decorate([
    (0, typeorm_1.Entity)({ name: "user" }),
    __metadata("design:paramtypes", [String, String, String, String, String])
], UserModel);
exports.UserModel = UserModel;
