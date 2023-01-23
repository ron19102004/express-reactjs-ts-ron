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
exports.ProductService = void 0;
const product_repository_1 = require("../repositories/product.repository");
class ProductService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find({
                relations: ["user", "category", "size"]
            });
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findOne({
                where: {
                    id: id
                },
                relations: ["user", "category", "size"]
            });
        });
        this.findByCategory = (category) => __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findByCategory(category);
        });
        this.findByCategoryAndSize = (category, size) => __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findByCategoryAndSize(category, size);
        });
        this.create = (product) => __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.save(product);
        });
        this.productRepository = new product_repository_1.ProductRepository().getRepository();
    }
}
exports.ProductService = ProductService;
