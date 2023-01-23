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
exports.SizeController = void 0;
const size_service_1 = require("../services/size.service");
const size_model_1 = require("../models/size.model");
class SizeController {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sizes = yield this.sizeService.findAll();
            //@ts-ignore
            res.status(200).json({
                total_sizes: sizes.length,
                size: sizes
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let size = req.body.size || null;
            if (!size) {
                //@ts-ignore
                res.status(404).json({
                    message: "Invalid Size",
                });
                return;
            }
            let has_size = yield this.sizeService.findBySize(size);
            if (has_size) {
                //@ts-ignore
                res.status(401).json({
                    message: "size is exist"
                });
                return;
            }
            let sizeModel = new size_model_1.SizeModel(size);
            yield this.sizeService.create(sizeModel);
            //@ts-ignore
            res.status(200).json({
                size: sizeModel
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let id = req.body.id || null;
            if (!id) {
                //@ts-ignore
                res.status(404).json({
                    message: "Invalid Id Size"
                });
                return;
            }
            yield this.sizeService.delete(id);
        });
        this.sizeService = new size_service_1.SizeService();
    }
}
exports.SizeController = SizeController;
