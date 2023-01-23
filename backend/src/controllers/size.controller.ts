import { SizeService } from '../services/size.service';
import { SizeModel } from '../models/size.model';

export class SizeController {
    private sizeService:SizeService;
    constructor() {
        this.sizeService = new SizeService();
    }
    public findAll = async (req:Request, res:Response):Promise<void> => {
        let sizes:SizeModel[] = await this.sizeService.findAll();
        //@ts-ignore
        res.status(200).json({
            total_sizes: sizes.length,
            size: sizes
        });
    }
    public create = async (req:Request, res:Response):Promise<void> => {
        //@ts-ignore
        let size:string = req.body.size || null;
        if(!size) {
          //@ts-ignore
          res.status(404).json({
            message: "Invalid Size",
          });
          return;
        }
        let has_size:SizeModel = await this.sizeService.findBySize(size);
        if(has_size) {
            //@ts-ignore
            res.status(401).json({
                message:"size is exist"
            });
            return;
        }
        let sizeModel:SizeModel = new SizeModel(size);
        await this.sizeService.create(sizeModel);
        //@ts-ignore
        res.status(200).json({
            size: sizeModel
        })
    }
    public delete =async (req:Request,res:Response):Promise<void> => {
        //@ts-ignore
        let id:number = req.body.id || null;
        if(!id) {
            //@ts-ignore
            res.status(404).json({
                message:"Invalid Id Size"
            });
            return;
        }
        await this.sizeService.delete(id);
    }
}