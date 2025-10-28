import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto, UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  add(@Body() dto: CreateUserDto) {
    console.log('接参', dto);

    return this.userService.createUser(dto);
  }

  @Get('get')
  getUser() {
    return this.userService.getUser();
  }

  @Post('getById')
  getById(@Body() dto: CreateUserDto) {
    return this.userService.findName(dto);
  }
}
