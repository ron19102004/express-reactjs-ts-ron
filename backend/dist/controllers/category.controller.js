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
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const category_model_1 = require("../models/category.model");
class CategoryController {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.categoryService.findAll();
            //@ts-ignore
            res.status(200).json({
                length: data.length,
                category: data
            });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let data = yield this.categoryService.findById(req.params.id);
            //@ts-ignore
            res.status(200).json({
                category: data
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let { name, description, titleURL } = req.body;
            let has_exists = yield this.categoryService.findByTitleURL(titleURL);
            if (has_exists) {
                //@ts-ignore
                res.status(404).json({
                    message: "title is exits !!!"
                });
                return;
            }
            if (!name) {
                //@ts-ignore
                res.status(404).json({
                    message: "error create category !!!"
                });
                return;
            }
            let cate = yield this.categoryService.findByName(name);
            if (cate) {
                //@ts-ignore
                res.status(402).json({
                    message: "category is exist !!!"
                });
                return;
            }
            let category = new category_model_1.CategoryModel(name, description, titleURL);
            yield this.categoryService.create(category);
            //@ts-ignore
            res.status(200).json({
                category: category
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            yield this.categoryService.delete(req.body.id);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let { name, description, id, titleURL } = req.body;
            let has_exits_titleURL = yield this.categoryService.findByTitleURL(titleURL);
            if (has_exits_titleURL) {
                //@ts-ignore
                res.status(402).json({
                    message: "title is exist !!!"
                });
                return;
            }
            let category = yield this.categoryService.findById(id);
            (name) ? category.name = name : "";
            (description) ? category.description = description : "";
            (titleURL) ? category.titleURL = titleURL : "";
            yield this.categoryService.update(category);
            //@ts-ignore
            res.status(200).json({ category: category });
        });
        this.categoryService = new category_service_1.CategoryService();
    }
}
exports.CategoryController = CategoryController;
