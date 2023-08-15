import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUser(@Request() req) {
    return req.user;
  }
}
