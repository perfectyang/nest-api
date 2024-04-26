import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

export const UncheckAuth = () => SetMetadata('uncheck', true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('token', token);
    const uncheck = Reflect.getMetadata('uncheck', context.getHandler());
    if (!token && uncheck) {
      request['user'] = null;
    } else if (!token) {
      throw new UnauthorizedException();
    }
    // get metadata
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      request['user'] = payload;
    } catch {
      if (!uncheck) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
