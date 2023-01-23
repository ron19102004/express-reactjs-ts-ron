import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { DatabaseConfig } from '../configurations/database.config';

export class CategoryService {
    //@ts-ignore
    private categoryRepository: Repository;
    constructor(){
        this.categoryRepository = DatabaseConfig.dataSource.getRepository(CategoryModel);        
    }
    public findAll = async (): Promise<CategoryModel[]>=>{
        return await this.categoryRepository.find();
    }
    public findById = async (id:number): Promise<CategoryModel>=>{
        return await this.categoryRepository.findOneBy({id: id});
    }
    public create = async (category: CategoryModel): Promise<void>=>{
        await this.categoryRepository.save(category);
    }
    public delete = async (id:number): Promise<void>=>{
        await this.categoryRepository.delete(id);
    }
    public update = async (category:CategoryModel): Promise<void>=>{
        await this.categoryRepository.save(category);
    }
    public findByName = async (name:string): Promise<CategoryModel>=>{
        return await this.categoryRepository.findOneBy({name:name});
    }
    public findByTitleURL = async (titleURL:string): Promise<CategoryModel>=>{
        return await this.categoryRepository.findOneBy({titleURL:titleURL});
    }
}