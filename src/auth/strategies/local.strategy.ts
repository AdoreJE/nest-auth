import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../../user/dto/login-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId'
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    console.log(userId, password);
    let loginUserDto: LoginUserDto = {
      userId: userId,
      password: password,
    }
    console.log(loginUserDto);

    const user = await this.authService.validateUser(loginUserDto);

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}