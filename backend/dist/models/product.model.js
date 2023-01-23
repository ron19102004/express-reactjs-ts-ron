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
exports.ProductModel = void 0;
const size_model_1 = require("./size.model");
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const category_model_1 = require("./category.model");
let ProductModel = class ProductModel {
    constructor(name, description, picture, category, size, user) {
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.category = category;
        this.size = size;
        this.user = user;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Object)
], ProductModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "name",
        type: "varchar",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", Object)
], ProductModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "description",
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProductModel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "picture",
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProductModel.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_model_1.UserModel),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: "fk_product_user" }),
    __metadata("design:type", Object)
], ProductModel.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => category_model_1.CategoryModel),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: "fk_product_category" }),
    __metadata("design:type", Object)
], ProductModel.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => size_model_1.SizeModel),
    (0, typeorm_1.JoinTable)({
        name: "product_size",
        inverseJoinColumn: { name: "product_size" },
    }),
    __metadata("design:type", Object)
], ProductModel.prototype, "size", void 0);
ProductModel = __decorate([
    (0, typeorm_1.Entity)({ name: "product" }),
    __metadata("design:paramtypes", [String, String, String, category_model_1.CategoryModel, Object, user_model_1.UserModel])
], ProductModel);
exports.ProductModel = ProductModel;
