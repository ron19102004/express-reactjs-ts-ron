import { SizeModel } from "./size.model";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";

@Entity({ name: "product" })
export class ProductModel {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number | undefined;
  @Column({
    name: "name",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  name: string | undefined;
  @Column({
    name: "description",
    type: "text",
    nullable: true,
  })
  description: string | undefined;
  @Column({
    name: "picture",
    type: "text",
    nullable: true,
  })
  picture: string | undefined;

  @OneToOne(() => UserModel)
  @JoinColumn({ foreignKeyConstraintName: "fk_product_user" })
  user: UserModel | undefined;
  //@ts-ignore
  @OneToOne(() => CategoryModel)
  @JoinColumn({ foreignKeyConstraintName: "fk_product_category" })
  category: CategoryModel | undefined;

  @ManyToMany(() => SizeModel)
  @JoinTable({
    name: "product_size",
    inverseJoinColumn: { name: "product_size" },
  })
  size: SizeModel[] | undefined;

  constructor(
    name: string,
    description: string,
    picture: string,
    category: CategoryModel,
    size: SizeModel[] | undefined,
    user: UserModel
  ) {
    this.name = name;
    this.description = description;
    this.picture = picture;
    this.category = category;
    this.size = size;
    this.user = user;
  }
}
