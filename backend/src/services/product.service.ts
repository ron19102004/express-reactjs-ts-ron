import { Repository } from 'typeorm';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { SizeModel } from '../models/size.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
    //@ts-ignore
    private productRepository: Repository;
    constructor(){
        this.productRepository = new ProductRepository().getRepository();
    }
    public findAll = async (): Promise<ProductModel[]> => {
        return await this.productRepository.find({
            relations:["user","category","size"]
        });
    }
    public findById = async (id:number): Promise<ProductModel>=>{
        return await this.productRepository.findOne({
            where:{
                id:id
            },
            relations:["user","category","size"]
        });
    }
    public findByCategory = async (category: CategoryModel): Promise<ProductModel[]> => {
        return await this.productRepository.findByCategory(category);
    }
    public findByCategoryAndSize = async (category: CategoryModel,size:SizeModel): Promise<ProductModel[]> => {
        return await this.productRepository.findByCategoryAndSize(category,size);
    }
    public create = async (product:ProductModel): Promise<void> => {
        await this.productRepository.save(product);
    }
}