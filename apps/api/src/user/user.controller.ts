import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto, UserService } from './user.service';
import { ErrorResponse } from 'src/common/base';

@Controller('user')
export class UserController extends ErrorResponse {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('add')
  add(@Body() dto: CreateUserDto) {
    return this.tryError(this.userService.createUser(dto));
  }

  @Get('get')
  getUser() {
    return this.tryError(this.userService.getUser());
  }

  @Post('getById')
  getById(@Body() dto: CreateUserDto) {
    return this.tryError(this.userService.findName(dto));
  }
}
