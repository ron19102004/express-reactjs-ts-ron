import e from "express";
const cors = require('cors');
export class CorsConfig {
    private app:e.Application;
    constructor(app:e.Application) {
        this.app = app;
    }
    public config = ():void => {
        const corsOptions = {
            origin: `http://localhost:3000`,
            credentials: true, //access-control-allow-credentials:true
            optionSuccessStatus: 200,
        };
        this.app.use(cors(corsOptions));
    };
}