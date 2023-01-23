import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { ProductModel } from './product.model';

@Entity({name:"size"})
export class SizeModel {
    @PrimaryGeneratedColumn()
    id:number | undefined;

    @Column({
        name:"size",
        type:"varchar",
        length:50
    })
    size:string | undefined;

    constructor(size:string){
        this.size = size;
    }
}