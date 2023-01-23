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
exports.SizeService = void 0;
const database_config_1 = require("../configurations/database.config");
const size_model_1 = require("../models/size.model");
class SizeService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.sizeRepository.find();
        });
        this.create = (size) => __awaiter(this, void 0, void 0, function* () {
            return yield this.sizeRepository.save(size);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.sizeRepository.delete(id);
        });
        this.findBySize = (size) => __awaiter(this, void 0, void 0, function* () {
            return yield this.sizeRepository.findOneBy({ size: size });
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.sizeRepository.findOneBy({ id: id });
        });
        this.sizeRepository = database_config_1.DatabaseConfig.dataSource.getRepository(size_model_1.SizeModel);
    }
}
exports.SizeService = SizeService;
