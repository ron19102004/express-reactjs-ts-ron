"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const typeorm_1 = require("typeorm");
const index_model_1 = require("../models/index.model");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class DatabaseConfig {
    constructor() {
        this.connect = () => {
            DatabaseConfig.dataSource = new typeorm_1.DataSource({
                type: "mysql",
                host: this.env.HOST_DATABASE,
                port: parseInt(this.env.PORT_DATABASE),
                username: this.env.USERNAME_DATABASE,
                password: this.env.PASSWORD_DATABASE,
                database: this.env.DATABASE_NAME,
                synchronize: true,
                entities: [index_model_1.UserModel, index_model_1.ProductModel, index_model_1.CategoryModel, index_model_1.SizeModel]
            });
        };
        this.check = () => {
            DatabaseConfig.dataSource.initialize()
                .then(() => {
                console.log("Data Source has been initialized!");
            })
                .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
        };
        this.env = process.env;
        this.connect();
        this.check();
    }
}
exports.DatabaseConfig = DatabaseConfig;
