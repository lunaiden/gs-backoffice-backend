import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Res,
  Query,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // user signup
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.signIn(signInDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(200).send({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        expiration: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.status(200).send('logout success');
  }

  @Get('forgot-password')
  sendEmailForgotPassword(@Query() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.sendEmailForgotPassword(forgotPasswordDto);
  }

  // get connected user profile
  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
