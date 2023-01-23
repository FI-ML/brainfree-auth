import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {UserEntity} from '../entities/User.entity';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import {SignupDto} from '../dto/signup.dto';
import {SigningDto} from '../dto/signingDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userMappingService: UserMappingService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignupDto) {
    return await this.authService.signup(signUpDto);
  }

  @Post('singing')
  async singing(@Body() signingDto: SigningDto) {
    return await this.authService.singing(signingDto);
  }


  @Get('sign-out')
  async signOut() {
   return await this.authService.signOut();
  }

}
