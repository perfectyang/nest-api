import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  userInfo() {
    return this.authService.getUser();
  }
}
