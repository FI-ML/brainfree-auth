import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {UserEntity} from '../../user/entites/User.entity';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import {SignupDto} from '../dto/signup.dto';
import {SigningDto} from '../dto/signingDto';
import {AST} from 'eslint';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userMappingService: UserMappingService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignupDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('singing')
  async singing(@Body() signingDto: SigningDto,@Req() req,@Res()res) {
    return await this.authService.signIn(signingDto,req,res);
  }


  @Get('sign-out')
  async signOut(@Req() req,@Res()res) {
   return await this.authService.signOut(req,res);
  }

}
