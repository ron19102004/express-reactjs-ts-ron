import { AuthLoginService } from '../service/auth.login.service';
import { AuthRefreshTokenService } from '../service/auth.reqtk.service';

export class AuthController {
    private authLoginService:AuthLoginService;
    private authRefreshTokenService:AuthRefreshTokenService;
    constructor() {
        this.authLoginService = new AuthLoginService();
        this.authRefreshTokenService = new AuthRefreshTokenService();
    }
    public login = async (req:Request,res:Response):Promise<void>=>{
        // @ts-ignore
        let email:string = req.body.email||null;
        // @ts-ignore
        let password:string = req.body.password||null;
        let data:any = await this.authLoginService.login(email,password);
        // @ts-ignore
        await res.json(data);
    }
    public refreshToken=async (req:Request,res:Response):Promise<void> =>{
        // @ts-ignore
        let refreshToken = req.body.refreshToken;
        let status:any = await this.authRefreshTokenService.refreshToken(refreshToken);
        // @ts-ignore
        await res.json(status);

    }

}