import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AccessTokenStrategy } from '../../auth/strategies/accessToken/accessToken.strategy';

@Controller('v1/users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AccessTokenStrategy)
  @Get('user')
  async findUserByMail(@Req() req) {
    return await this.userService.findUserByMailAndReturnToken(req);
  }

  @UseGuards(AccessTokenStrategy)
  @Get('user/roles')
  async findRolesByUser(@Req() req) {
    return await this.userService.findRolesByUser(req);
  }

  @UseGuards(AccessTokenStrategy)
  @Delete('user/delete/:email')
  async delete(@Param() email: string) {
    return await this.userService.delete(email);
  }
}
