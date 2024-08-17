import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { excludeProperties } from '../../common';
import { ConfigService } from '@nestjs/config';
import { RolesService } from '../roles';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { VerificatedUserService } from '../verificated-user/verificated-user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleService: RolesService,
    private verificatedUserService: VerificatedUserService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const role = await this.roleService.findOne(registerDto.roleId);
      if (role && role.name.toLowerCase() === 'admin')
        throw new UnauthorizedException();
      const isExistsUsername = await this.userService.findByUsername(
        registerDto.username,
      );

      if (isExistsUsername) {
        throw new BadRequestException('Username already exists');
      }

      const isExistsPhone =
        registerDto.phone &&
        (await this.userService.findByPhoneNumber(registerDto.phone));

      if (isExistsPhone) {
        throw new BadRequestException('Phone number already exists');
      }

      const password = await bcrypt.hash(registerDto.password, 10);

      const newUser = await this.userService.create({
        ...registerDto,
        password,
      });
      const otp = this.createOTP();
      await this.cacheManager.set(`otp:${newUser.id}`, otp, 300);
      console.log('User OTP', otp);
      return this.generateTokens(newUser);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return this.generateTokens(user);
  }

  async verifyAccessToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      const user = await this.userService.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return {
        accessToken: token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userService.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return { accessToken: this.generateTokens(user).accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyUser(userId: number, otp: string) {
    const cachedOTP = await this.cacheManager.get<string>(`otp:${userId}`);
    if (!cachedOTP) {
      throw new UnauthorizedException('OTP wrong or expired');
    }
    if (cachedOTP === otp) {
      return await this.verificatedUserService.verifyUser(userId);
    }
    throw new UnauthorizedException('User not verified');
  }

  async getProfile(userId: number) {
    const user = await this.userService.findById(userId);
    return user;
  }

  private generateTokens(user: any) {
    const payload = excludeProperties(user, ['password']);
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRED'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRED'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private createOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
