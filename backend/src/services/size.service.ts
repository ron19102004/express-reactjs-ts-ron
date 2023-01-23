import { DatabaseConfig } from '../configurations/database.config';
import { SizeModel } from '../models/size.model';
import { Repository } from 'typeorm';

export class SizeService {
    //@ts-ignore
    private sizeRepository:Repository;
    constructor() {
        this.sizeRepository = DatabaseConfig.dataSource.getRepository(SizeModel);
    }
    public findAll = async (): Promise<SizeModel[]>=>{
        return await this.sizeRepository.find();
    }
    public create = async (size:SizeModel): Promise<void> => {
        return await this.sizeRepository.save(size);
    }
    public delete = async (id:number): Promise<void> => {
        await this.sizeRepository.delete(id);
    }
    public findBySize = async (size:string): Promise<SizeModel> => {
        return await this.sizeRepository.findOneBy({size:size});
    }
    public findById = async (id:number): Promise<SizeModel> => {
        return await this.sizeRepository.findOneBy({id:id});
    }
}