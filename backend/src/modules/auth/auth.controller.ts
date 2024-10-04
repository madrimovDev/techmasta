import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, VerifyUserDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { Role } from '../../common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @WrapperDecorator({
    isPublic: true,
    summary: ['Registration'],
  })
  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.register(registerDto);
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Sign in'],
  })
  @UseGuards(AuthGuard('local'))
  @ApiBody({
    type: LoginDto,
  })
  @Post('/login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res
      .cookie('refreshToken', req.user['refreshToken'], {
        httpOnly: true,
      })
      .send({ accessToken: req.user['accessToken'] });
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Refresh access token'],
  })
  @Get('/refresh')
  async refreshAccessToken(@Req() req: Request) {
    return this.authService.refreshAccessToken(req.cookies['refreshToken']);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Verify access token'],
  })
  @Get('/verify-access')
  verify(@Req() req: Request) {
    return req.user;
  }

  @WrapperDecorator({
    isPublic: [Role.User],
    summary: ['Verify user by OTP'],
  })
  @Post('/verify-user')
  async verifyUser(@Req() req: Request, @Body() verifyUserDTO: VerifyUserDto) {
    const verified = await this.authService.verifyUser(
      req.user.id,
      verifyUserDTO.otp,
    );
    return {
      verified,
    };
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Get Profile'],
  })
  @Get('/profile')
  async getProfile(@Req() req: Request) {
    const userId = req.user.id;
    return this.authService.getProfile(userId);
  }
}
