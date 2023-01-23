import { DataSource, Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { DatabaseConfig } from "../configurations/database.config";

export class UserRepository {
    private dataSource:DataSource;
    //@ts-ignore
    private repository:Repository;
    constructor(){
        this.dataSource = DatabaseConfig.dataSource;
        this.repository = this.dataSource.getRepository(UserModel).extend({
          pagination: (skip: number, take: number) => {
            return this.repository.find({
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
              },
              take: take,
              skip: skip,
            });
          },
        });
    }
    //@ts-ignore
    public getRepository = ():Repository => {
        return this.repository;
    }
}