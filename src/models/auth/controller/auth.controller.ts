import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { SigningDto } from '../dto/signingDto';
import { RefreshTokenGuard } from '../../../common/guards/refresh.token.guard';
import { AccessTokenGuard } from '../../../common/guards/access.token.guard';
import { Request } from 'express';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignupDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('singing')
  async singing(@Body() signingDto: SigningDto) {
    return await this.authService.signIn(signingDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async signOut(@Req() req: Request) {
    return await this.authService.logout(req);
  }

}
