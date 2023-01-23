import { CategoryService } from "../services/category.service";
import { CategoryModel } from '../models/category.model';

export class CategoryController {
    private categoryService: CategoryService;
    constructor(){
        this.categoryService = new CategoryService();
    }
    public findAll = async (req:Request,res:Response):Promise<void>=>{
        let data:CategoryModel[] = await this.categoryService.findAll();        
        //@ts-ignore
        res.status(200).json({
            length: data.length,
            category: data
        })
    }
    public findById = async (req:Request,res:Response):Promise<void>=>{
        //@ts-ignore
        let data:CategoryModel = await this.categoryService.findById(req.params.id);
        //@ts-ignore
        res.status(200).json({
            category: data
        })
    }
    public create = async (req:Request,res:Response):Promise<void>=>{
        //@ts-ignore
        let {name,description,titleURL} = req.body;
        let has_exists:CategoryModel = await this.categoryService.findByTitleURL(titleURL);
        if (has_exists) {
             //@ts-ignore
             res.status(404).json({
                message:"title is exits !!!"
            });
            return;
        }
        if(!name) {
            //@ts-ignore
            res.status(404).json({
                message:"error create category !!!"
            });
            return;
        }
        let cate:CategoryModel = await this.categoryService.findByName(name);
        if(cate) {
             //@ts-ignore
             res.status(402).json({
                message:"category is exist !!!"
            });
            return;
        }
        let category:CategoryModel = new CategoryModel(name,description,titleURL);
        await this.categoryService.create(category);
        //@ts-ignore
        res.status(200).json({
            category: category
        })
    }
    public delete = async (req:Request,res:Response):Promise<void>=>{
        //@ts-ignore
        await this.categoryService.delete(req.body.id);
    }
    public update = async (req:Request,res:Response):Promise<void>=>{
        //@ts-ignore
        let {name,description,id,titleURL} = req.body;
        let has_exits_titleURL:CategoryModel = await this.categoryService.findByTitleURL(titleURL);
        if (has_exits_titleURL) {
             //@ts-ignore
             res.status(402).json({
                message:"title is exist !!!"
            });
            return;
        }
        let category:CategoryModel = await this.categoryService.findById(id);
        (name) ? category.name = name : "";
        (description) ? category.description = description : "";
        (titleURL) ? category.titleURL = titleURL : "";
        await this.categoryService.update(category);
        //@ts-ignore
        res.status(200).json({ category: category});
    }
}