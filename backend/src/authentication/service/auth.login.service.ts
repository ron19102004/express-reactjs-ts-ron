import { UserService } from "../../services/user.service";
import { AuthGenerateTokenService } from "./auth.gtk.service";
import * as dotenv from "dotenv";
import { UserModel } from "../../models/user.model";
dotenv.config();

export class AuthLoginService {
  private userService: UserService;
  private authGenerateTokenService: AuthGenerateTokenService;
  constructor() {
    this.userService = new UserService();
    this.authGenerateTokenService = new AuthGenerateTokenService();
  }
  public login = async (email: string, password: string): Promise<any> => {
    let user: UserModel = await this.userService.findByEmail(email);
    if (!user)
      return {
        status: "error",
        message: "User not found",
      };
    if (user.password !== password)
      return {
        status: "error",
        message: "password is incorrect",
      };
    let dataForAccessToken: JSON = {
      //@ts-ignore
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avt: user.avatar,
    };
    let accessToken: any = this.authGenerateTokenService.generateToken(
      dataForAccessToken,
      // @ts-ignore
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_LIFE
    );
    if (!accessToken) {
      return {
        message: "Generate access token is not successful.Try again!",
      };
    }
    let refreshToken: any = await this.authGenerateTokenService.generateToken(
      dataForAccessToken,
      // @ts-ignore
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_LIFE
    );
    if (user.refreshToken) {
      refreshToken = user.refreshToken;
    } else {
      //@ts-ignore
      await this.userService.updateRefreshToken(user.id, refreshToken);
    }
    return {
      message: "login successfully !!!.",
      jwt: {
        accessToken: accessToken,
        refreshToken: refreshToken
      },
      user:user
    };
  };
}
