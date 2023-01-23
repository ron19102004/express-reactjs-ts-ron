import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

export class UserController {
    private userService:UserService;
    constructor(){
        this.userService = new UserService();
    }
    public findAll = async (req: Request, res: Response):Promise<void> => {
        let users:UserModel[] = await this.userService.findAll();
        let data:any = [];
        users.forEach((user:UserModel) => {
            data.push({
                id:user.id,
                name:user.name,
                email:user.email,
                role: user.role,
                avatar:user.avatar
             });
        });
        // @ts-ignore
        res.status(200).json({
            message:"full information users ",
            data : {
                length:users.length,
                users:data
            }
        });
    }
    public create = async (req: Request, res: Response): Promise<void> =>{
        //@ts-ignore
        let {name, email, role, avatar, password} = req.body; 
        if (!name || !email || !password) {
            // @ts-ignore
            res.status(404).json({
                message:"error create user !!!"
            });
            return;
        }       
        let userEmail:UserModel = await this.userService.findByEmail(email);
        if (userEmail) {
            //@ts-ignore
            res.status(403).json({
                message:"error email is exist !!!"
            });
            return;
        }
        let user:UserModel = new UserModel(name,email,role,avatar,password);
        await this.userService.create(user);
        // @ts-ignore
        res.status(200).json({
            message:"success create user",
            user: user
        })
    }
    public findById = async (req: Request, res:Response): Promise<void> =>{                
        // @ts-ignore
        let id:number = parseInt(req.params.id)|| null;
        let user:UserModel = await this.userService.findById(id);
        // @ts-ignore
        res.status(200).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
             }
        });
    }
    public pagination = async (req: Request, res:Response):Promise<void> =>{
        //@ts-ignore
        let page:number = parseInt(req.params.page) || 0;
        // @ts-ignore
        let users_data:UserModel[] = await this.userService.findAll();
        let length:number = users_data.length;
        let take:number = 7;
        let numPage:number = Math.floor(length / take);
        (numPage*take < length) ? numPage++ : ""; 
        let skip:number = (page * take) - take;
        let users:UserModel[] = await this.userService.pagination(skip,take);
        let data:any = [];
        users.forEach((user:UserModel)=>{
            data.push({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
            });
        })
        //@ts-ignore
        res.status(200).json({
            pages: {
               total_pages: numPage,
               page_current:page
            },
            data:{
                length: data.length,
                users: data
            }
        });
    }
    public delete = async (req:Request, res:Response):Promise<void>=>{
        //@ts-ignore
        let id:number = parseInt(req.body.id) || 0;
        if (!id) return;
        await this.userService.delete(id);
        //@ts-ignore
        res.status(200).json({
            message: 'User deleted successfully'
        })
    }
}