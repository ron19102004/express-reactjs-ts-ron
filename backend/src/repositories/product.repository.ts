import { DataSource, Repository } from 'typeorm';
import { DatabaseConfig } from "../configurations/database.config";
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { SizeModel } from '../models/size.model';

export class ProductRepository {
    private dataSource:DataSource;
    //@ts-ignore
    private repository:Repository;
    constructor(){
        this.dataSource = DatabaseConfig.dataSource;
        this.repository = this.dataSource.getRepository(ProductModel).extend({
          findByCategoryAndSize: (category: CategoryModel, size: SizeModel) => {
            return this.repository.find({
              relations: ["user", "size", "category"],
              where: {
                category: category,
                size: size,
              },
            });
          },
          findByCategory: (category: CategoryModel) => {
            return this.repository.find({
              relations: ["user", "size", "category"],
              where: {
                category: category,
              }
            });
          },
        });
    }
    //@ts-ignore
    public getRepository = ():Repository => {
        return this.repository;
    }
}