import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  login(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
  @Get('get')
  getUser() {
    return this.userService.getUser();
  }
}
