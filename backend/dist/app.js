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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const database_config_1 = require("./configurations/database.config");
const auth_route_1 = require("./authentication/routes/auth.route");
const cors_config_1 = require("./configurations/cors.config");
const index_route_1 = require("./routes/index.route");
dotenv.config();
class App {
    constructor() {
        this.init = () => {
            this.setUp();
            this.setDatabase();
            this.setRoute();
            this.run();
        };
        this.setUp = () => {
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.corsConfig.config();
        };
        this.setRoute = () => {
            //@ts-ignore
            this.app.use("/", new auth_route_1.AuthRoute().route);
            this.app.use("/", new index_route_1.UserRoute().route);
            this.app.use("/", new index_route_1.CategoryRoute().route);
            this.app.use("/", new index_route_1.SizeRoute().route);
            this.app.use("/", new index_route_1.ProductRoute().route);
            //introduce my api
            this.app.get("/", (req, res) => {
                res.send(`<a style = "color: blue; text-decoration: none;font-size:30px;font-weight:bold;"
                href="https://github.com/ron19102004/api-ex-reactjs-ts-ron/blob/master/backend/README.md">
                Giới thiệu tại đây ⬇️</a>`);
            });
        };
        this.run = () => {
            this.app.listen(this.port, () => {
                console.log(`Running on port http://localhost:${this.port}`);
            });
        };
        this.setDatabase = () => {
            new database_config_1.DatabaseConfig();
        };
        this.app = (0, express_1.default)();
        this.corsConfig = new cors_config_1.CorsConfig(this.app);
        this.port = parseInt(process.env.PORT || "3000") || 3000;
        this.init();
    }
}
exports.App = App;
