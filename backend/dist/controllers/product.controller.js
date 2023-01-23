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
exports.ProductController = void 0;
const product_model_1 = require("./../models/product.model");
const product_service_1 = require("../services/product.service");
const user_service_1 = require("../services/user.service");
const category_service_1 = require("../services/category.service");
const size_service_1 = require("../services/size.service");
class ProductController {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let products = yield this.productService.findAll();
            let isEmpty = Object.keys(products).length === 0;
            if (isEmpty) {
                //@ts-ignore
                res.status(404).json({ message: "Products not found" });
                return;
            }
            let data = [];
            products.forEach((product) => {
                var _a, _b, _c;
                data.push({
                    user_upload: {
                        id: (_a = product.user) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = product.user) === null || _b === void 0 ? void 0 : _b.name,
                        email: (_c = product.user) === null || _c === void 0 ? void 0 : _c.email
                    },
                    category: product.category,
                    product: {
                        idProduct: product.id,
                        name: product.name,
                        description: product.description,
                        picture: product.picture
                    },
                    size: product.size
                });
            });
            //@ts-ignore
            res.status(200).json({
                total_products: products.length,
                data: data
            });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            //@ts-ignore
            let id = req.params.id;
            let product = yield this.productService.findById(id);
            if (!product) {
                //@ts-ignore
                res.status(404).json({
                    message: 'Product not found'
                });
                return;
            }
            //@ts-ignore
            res.status(200).json({
                data: {
                    user_upload: {
                        id: (_a = product.user) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = product.user) === null || _b === void 0 ? void 0 : _b.name,
                        email: (_c = product.user) === null || _c === void 0 ? void 0 : _c.email
                    },
                    category: product.category,
                    product: {
                        idProduct: product.id,
                        name: product.name,
                        description: product.description,
                        picture: product.picture
                    },
                    size: product.size
                }
            });
        });
        this.findByCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let titleURL = req.params.titleURL;
            let categoryURL = yield this.categoryService.findByTitleURL(titleURL);
            if (!categoryURL) {
                //@ts-ignore
                res.status(404).json({
                    message: "category not found"
                });
                return;
            }
            let products = yield this.productService.findByCategory(categoryURL);
            let isEmpty = Object.keys(products).length === 0;
            if (isEmpty) {
                //@ts-ignore
                res.status(404).json({ message: "Products not found" });
                return;
            }
            let data = [];
            products.forEach((product) => {
                var _a, _b, _c;
                data.push({
                    user_upload: {
                        id: (_a = product.user) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = product.user) === null || _b === void 0 ? void 0 : _b.name,
                        email: (_c = product.user) === null || _c === void 0 ? void 0 : _c.email
                    },
                    product: {
                        idProduct: product.id,
                        name: product.name,
                        description: product.description,
                        picture: product.picture
                    },
                    size: product.size
                });
            });
            //@ts-ignore
            res.status(200).json({
                total_products: products.length,
                category: categoryURL,
                data: data
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let { idUser, idCategory, idSize, name, description, picture } = req.body;
            let user = yield this.userService.findById(idUser);
            if (!user) {
                //@ts-ignore
                res.status(404).json({ message: "user not found" });
                return;
            }
            let category = yield this.categoryService.findById(idCategory);
            if (!category) {
                //@ts-ignore
                res.status(404).json({ message: "category not found" });
                return;
            }
            //@ts-ignore
            let id_size = idSize.split(",");
            let size = [];
            id_size.forEach((i) => __awaiter(this, void 0, void 0, function* () {
                let id = parseInt(i);
                let sizeModel = yield this.sizeService.findById(id);
                size.push(sizeModel);
            }));
            if (!name) {
                //@ts-ignore
                res.status(404).json({ message: "invalid name" });
                return;
            }
            //new product
            let product = new product_model_1.ProductModel(name, description, picture, category, size, user);
            yield this.productService.create(product);
            //@ts-ignore
            res.status(200).json({
                size: {
                    id: id_size,
                    size: size
                },
                product: product
            });
        });
        this.productService = new product_service_1.ProductService();
        this.userService = new user_service_1.UserService();
        this.categoryService = new category_service_1.CategoryService();
        this.sizeService = new size_service_1.SizeService();
    }
}
exports.ProductController = ProductController;
