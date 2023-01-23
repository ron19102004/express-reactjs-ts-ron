"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsConfig = void 0;
const cors = require('cors');
class CorsConfig {
    constructor(app) {
        this.config = () => {
            const corsOptions = {
                origin: `http://localhost:3000`,
                credentials: true,
                optionSuccessStatus: 200,
            };
            this.app.use(cors(corsOptions));
        };
        this.app = app;
    }
}
exports.CorsConfig = CorsConfig;
