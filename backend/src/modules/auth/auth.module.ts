import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { VerificatedUserService } from '../verificated-user/verificated-user.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UsersService,
    ConfigService,
    VerificatedUserService,
  ],
})
export class AuthModule {}
