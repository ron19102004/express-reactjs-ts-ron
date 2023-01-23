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
exports.CategoryModel = void 0;
const product_model_1 = require("./product.model");
const typeorm_1 = require("typeorm");
let CategoryModel = class CategoryModel {
    constructor(name, description, titleURL) {
        this.name = name;
        this.description = description;
        this.titleURL = titleURL;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], CategoryModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "name",
        type: "varchar",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", Object)
], CategoryModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "titleURL",
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true
    }),
    __metadata("design:type", Object)
], CategoryModel.prototype, "titleURL", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "description",
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", Object)
], CategoryModel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_model_1.ProductModel, (product) => product.category),
    __metadata("design:type", Object)
], CategoryModel.prototype, "product", void 0);
CategoryModel = __decorate([
    (0, typeorm_1.Entity)({ name: "category" }),
    __metadata("design:paramtypes", [String, String, String])
], CategoryModel);
exports.CategoryModel = CategoryModel;
