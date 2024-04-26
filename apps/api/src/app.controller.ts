import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello')
  // getHello(): Record<string, any> {
  //   return this.appService.getHello();
  // }
  //
  // @Get('users')
  // getUser(): Record<string, any> {
  //   return {
  //     name: 'perfect',
  //     age: 18,
  //   };
  // }
  //
  // @Post('createUser')
  // createUser(): Record<string, any> {
  //   return {};
  // }
}
