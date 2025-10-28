import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.userService.findName(dto);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, user: user.user };
    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async signup(dto: CreateUserDto) {
    const user = await this.userService.findName(dto);
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const res = await this.userService.createUser(dto);
    const payload = { userId: res.id, user: dto.user };
    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        ...payload,
      },
    };
  }

  async getUser() {
    return {
      data: await this.userService.getUser(),
    };
  }
}
