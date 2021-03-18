import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }
}
