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
exports.CategoryService = void 0;
const category_model_1 = require("../models/category.model");
const database_config_1 = require("../configurations/database.config");
class CategoryService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.find();
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findOneBy({ id: id });
        });
        this.create = (category) => __awaiter(this, void 0, void 0, function* () {
            yield this.categoryRepository.save(category);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.categoryRepository.delete(id);
        });
        this.update = (category) => __awaiter(this, void 0, void 0, function* () {
            yield this.categoryRepository.save(category);
        });
        this.findByName = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findOneBy({ name: name });
        });
        this.findByTitleURL = (titleURL) => __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findOneBy({ titleURL: titleURL });
        });
        this.categoryRepository = database_config_1.DatabaseConfig.dataSource.getRepository(category_model_1.CategoryModel);
    }
}
exports.CategoryService = CategoryService;
