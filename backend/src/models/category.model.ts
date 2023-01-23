import { ProductModel } from './product.model';

import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
@Entity({ name: "category" })
export class CategoryModel {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    name: "name",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  name: string | undefined;

  @Column({
    name: "titleURL",
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true
  })
  titleURL: string | undefined;

  @Column({
    name: "description",
    type: "text",
    nullable: true,
  })
  description: string | undefined;

  @OneToMany(() => ProductModel, (product) => product.category)
  product: ProductModel | undefined;

  constructor(name: string, description: string, titleURL: string) {
    this.name = name;
    this.description = description;
    this.titleURL = titleURL;
  }
}