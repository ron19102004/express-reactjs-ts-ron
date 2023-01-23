"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const database_config_1 = require("../configurations/database.config");
const product_model_1 = require("../models/product.model");
class ProductRepository {
    constructor() {
        //@ts-ignore
        this.getRepository = () => {
            return this.repository;
        };
        this.dataSource = database_config_1.DatabaseConfig.dataSource;
        this.repository = this.dataSource.getRepository(product_model_1.ProductModel).extend({
            findByCategoryAndSize: (category, size) => {
                return this.repository.find({
                    relations: ["user", "size", "category"],
                    where: {
                        category: category,
                        size: size,
                    },
                });
            },
            findByCategory: (category) => {
                return this.repository.find({
                    relations: ["user", "size", "category"],
                    where: {
                        category: category,
                    }
                });
            },
        });
    }
}
exports.ProductRepository = ProductRepository;
