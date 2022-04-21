import { Controller, Get, UseGuards, HttpStatus,Req } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport'
import { Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("auth-google")
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
     
  }

  @Get("/auth-facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/auth/facebook/callback")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
