import express from 'express';
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { DatabaseConfig } from './configurations/database.config';
import { AuthRoute } from './authentication/routes/auth.route';
import { CorsConfig } from './configurations/cors.config';
import { UserRoute ,CategoryRoute,SizeRoute,ProductRoute} from './routes/index.route';
dotenv.config();

export class App {
    private app:express.Application;
    private port:number;
    constructor(){
        this.app = express();
        this.port = parseInt(process.env.PORT || "3000") || 3000;
        this.init();
    }
    private init = ():void => {
        this.setUp();
        this.setDatabase();
        this.setRoute();
        this.run();
    }
    private setUp = ():void => {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        new CorsConfig(this.app);
    }
    private setRoute = ():void => {
        //@ts-ignore
        this.app.use("/",new AuthRoute().route);
        this.app.use("/",new UserRoute().route);
        this.app.use("/",new CategoryRoute().route);
        this.app.use("/",new SizeRoute().route);
        this.app.use("/",new ProductRoute().route);
        //introduce my api
        this.app.get("/",(req,res)=>{
            res.send(
                `<a style = "color: blue; text-decoration: none;font-size:30px;font-weight:bold;"
                href="https://github.com/ron19102004/api-ex-reactjs-ts-ron/blob/master/backend/README.md">
                Giới thiệu tại đây ⬇️</a>`)
        })
    }
    private run = ():void => {
        this.app.listen(this.port,():any=>{
            console.log(`Running on port http://localhost:${this.port}`);
        });
    }
    private setDatabase = ():void => {
        new DatabaseConfig();
    }
}