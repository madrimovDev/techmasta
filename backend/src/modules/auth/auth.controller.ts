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
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  VerifyUserDto,
} from './dto/auth.dto';
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
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
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
  login(@Req() req: Request, @Res() res: Response) {
    res
      .cookie('refreshToken', req.user['refreshToken'], {
        httpOnly: true,
      })
      .send(req.user);
  }

  @WrapperDecorator({
    isPublic: true,
    summary: ['Refresh access token'],
  })
  @Post('/refresh')
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @WrapperDecorator({
    isPublic: [Role.Admin, Role.User],
    summary: ['Verify access token'],
  })
  @UseGuards(AuthGuard('local'))
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
    await this.authService.verifyUser(req.user.id, verifyUserDTO.otp);
    return 'User verified successfully';
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
