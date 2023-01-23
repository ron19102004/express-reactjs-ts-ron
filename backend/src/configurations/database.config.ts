import { DataSource } from "typeorm";
import { UserModel,ProductModel, CategoryModel,SizeModel } from "../models/index.model";
import * as dotenv from 'dotenv';
dotenv.config();

export class DatabaseConfig {
    public static dataSource: DataSource;
    private env:any;
    constructor(){
        this.env = process.env;
        this.connect();
        this.check();
    }
    private connect = ():void => {
        DatabaseConfig.dataSource = new DataSource({
            type: "mysql",
            host: this.env.HOST_DATABASE,
            port: parseInt(this.env.PORT_DATABASE),
            username: this.env.USERNAME_DATABASE,
            password: this.env.PASSWORD_DATABASE,
            database: this.env.DATABASE_NAME,
            synchronize:true,
            entities:[UserModel,ProductModel,CategoryModel,SizeModel]
        })
    }
    private check = ():void => {
        DatabaseConfig.dataSource.initialize()
        .then(() => {
              console.log("Data Source has been initialized!")
        })
        .catch((err) => {
         console.error("Error during Data Source initialization", err)
        })
    }
}