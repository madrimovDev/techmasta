import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    try {
      const request = context.switchToHttp().getRequest();
      const bearerToken: undefined | string[] =
        request.headers.authorization?.split(' ');

      if (!bearerToken) throw new UnauthorizedException('Token not provided');

      const [type, token] = bearerToken;
      if (!type || type !== 'Bearer') {
        throw new UnauthorizedException('Invalid token type');
      }

      const verify = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        ignoreExpiration: false,
      });

      request.user = { ...verify };
      return true;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else if (e instanceof NotBeforeError) {
        throw new UnauthorizedException('Token not active');
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }
  }
}
