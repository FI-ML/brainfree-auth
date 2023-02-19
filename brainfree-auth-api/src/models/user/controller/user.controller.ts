import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { AccessTokenGuard } from '../../../common/guards/access.token.guard';
import { UpdateUserDetailsDto } from '../dto/update.user.details.dto';

@Controller('v1/users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AccessTokenGuard)
  @Get('user')
  async findUserByMail(@Req() req: Request) {
    return await this.userService.findUserByMailAndReturnToken(req);
  }

  @UseGuards(AccessTokenGuard)
  @Get('user/roles')
  async findRolesByUser(@Req() req: Request) {
    return await this.userService.findRolesByUser(req);
  }

  @UseGuards(AccessTokenGuard)
  @Put('user')
  async updateUser(@Body() dto: UpdateUserDetailsDto, @Req() req: Request) {
    return await this.userService.updateUserDetails(dto, req);
  }


  @UseGuards(AccessTokenGuard)
  @Delete('user/delete')
  async delete(@Req() req: Request) {
    return await this.userService.delete(req);
  }
}
