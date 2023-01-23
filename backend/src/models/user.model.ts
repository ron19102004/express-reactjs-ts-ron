import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductModel } from "./product.model";

@Entity({ name: "user" })
export class UserModel {
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
    name: "password",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  password: string | undefined;
  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email: string | undefined;
  @Column({
    name: "role",
    type: "varchar",
    length: 20,
    default: "user",
  })
  role: string | undefined;
  @Column({
    name: "avatar",
    type: "text",
    nullable: true,
  })
  avatar: string | undefined;
  @Column({
    name: "refreshToken",
    type: "text",
    nullable: true,
  })
  refreshToken: string | undefined;
  @OneToMany(() => ProductModel, (product) => product.user)
  product: ProductModel[] | undefined;
  constructor(
    name: string,
    email: string,
    role: string,
    avatar: string,
    password: string
  ) {
    this.password = password;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
  }
}
