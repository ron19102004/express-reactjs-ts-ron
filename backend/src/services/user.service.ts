import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'typeorm';

export class UserService {
    //@ts-ignore
    private userRepository:Repository;
    constructor(){
        this.userRepository = new UserRepository().getRepository();
    }
    public findAll = async():Promise<UserModel[]> => {
        return await this.userRepository.find();
    }
    public findById = async(id:number):Promise<UserModel>=>{
        return this.userRepository.findOneBy({id:id});
    }
    public findByEmail = async(email:string):Promise<UserModel>=>{
        return this.userRepository.findOneBy({email:email});
    }
    public create = async(user:UserModel):Promise<void> => {
        await this.userRepository.save(user);
    }
    public pagination = async(skip:number,take:number):Promise<UserModel[]> => {        
        return await this.userRepository.pagination(skip,take);
    }
    public delete = async(id:number):Promise<void> => {
        await this.userRepository.delete(id);
    }
    public updateRefreshToken = async(id:number,token:string):Promise<void> => {
        await this.userRepository.update(id,{refreshToken:token});
    }
    public findByRefreshToken = async(token:string):Promise<UserModel>=>{
        return await this.userRepository.findOneBy({refreshToken:token});
    }
}