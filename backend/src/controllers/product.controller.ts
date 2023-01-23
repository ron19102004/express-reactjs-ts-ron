import { ProductModel } from './../models/product.model';
import { ProductService } from "../services/product.service";
import { UserModel,CategoryModel } from '../models/index.model';
import { UserService } from "../services/user.service";
import { CategoryService } from "../services/category.service";
import { SizeModel } from '../models/size.model';
import { SizeService } from "../services/size.service";

export class ProductController {
    private productService: ProductService;
    private userService: UserService;
    private categoryService: CategoryService;
    private sizeService: SizeService;
    constructor(){
        this.productService = new ProductService();
        this.userService = new UserService();
        this.categoryService = new CategoryService();
        this.sizeService = new SizeService();
    }
    public findAll = async (req: Request, res:Response):Promise<void> =>{
        let products:ProductModel[] = await this.productService.findAll();
        let isEmpty:boolean = Object.keys(products).length === 0;
        if(isEmpty){
            //@ts-ignore
            res.status(404).json({message: "Products not found"});
            return;
        }
        let data:any=[];
        products.forEach((product:ProductModel)=>{
            data.push({
                user_upload: {
                    id:product.user?.id,
                    name:product.user?.name,
                    email:product.user?.email
                },
                category:product.category,
                product:{
                    idProduct:product.id,
                    name:product.name,
                    description:product.description,
                    picture: product.picture
                },
                size:product.size
            })
        })
        //@ts-ignore
        res.status(200).json({
            total_products: products.length,
            data: data
        })
    }
    public findById = async (req: Request, res:Response):Promise<void> =>{
        //@ts-ignore
        let id:number = req.params.id;
        let product:ProductModel = await this.productService.findById(id);
        if(!product){
            //@ts-ignore
            res.status(404).json({
                message: 'Product not found'
            });
            return;
        }
        //@ts-ignore
        res.status(200).json({
            data: {
                user_upload: {
                    id:product.user?.id,
                    name:product.user?.name,
                    email:product.user?.email
                },
                category:product.category,
                product:{
                    idProduct:product.id,
                    name:product.name,
                    description:product.description,
                    picture: product.picture
                },
                size:product.size
            }
        })
    }
    public findByCategory = async (req: Request, res:Response):Promise<void> =>{
        //@ts-ignore
        let titleURL = req.params.titleURL;        
        let categoryURL:CategoryModel = await this.categoryService.findByTitleURL(titleURL);
        
        if(!categoryURL){
            //@ts-ignore
            res.status(404).json({
                message:"category not found"
            });
            return;
        }
        let products:ProductModel[] = await this.productService.findByCategory(categoryURL);
        let isEmpty:boolean = Object.keys(products).length === 0;
        if(isEmpty){
            //@ts-ignore
            res.status(404).json({message:"Products not found"});
            return;
        }
        let data:any=[];
        products.forEach((product:ProductModel)=>{
            data.push({
                user_upload: {
                    id:product.user?.id,
                    name:product.user?.name,
                    email:product.user?.email
                },
                product:{
                    idProduct:product.id,
                    name:product.name,
                    description:product.description,
                    picture: product.picture
                },
                size:product.size
            })
        })
        //@ts-ignore
        res.status(200).json({
            total_products: products.length,
            category:categoryURL,
            data:data
        })
    }
    public create = async (req: Request, res:Response):Promise<void> => {
        //@ts-ignore
        let { idUser, idCategory, idSize, name, description, picture } = req.body;
        let user:UserModel = await this.userService.findById(idUser);
        if (!user) {
            //@ts-ignore
            res.status(404).json({ message:"user not found"});
            return;
        }
        let category:CategoryModel = await this.categoryService.findById(idCategory);
        if (!category) {
            //@ts-ignore
            res.status(404).json({ message:"category not found"});
            return;
        }
        //@ts-ignore
        let id_size:string[] = idSize.split(",");
        let size:SizeModel[] = [];
        id_size.forEach(async(i:string) => {
            let id:number = parseInt(i);
            let sizeModel:SizeModel = await this.sizeService.findById(id);            
            size.push(sizeModel)
        })
        if (!name) {
             //@ts-ignore
             res.status(404).json({ message:"invalid name"});
             return;
        }
        //new product
        let product:ProductModel = new ProductModel(name,description,picture,category,size,user);
        await this.productService.create(product);
        //@ts-ignore
        res.status(200).json({ 
            size : {
                id: id_size,
                size: size
            },
            product: product
        });

    }
}