import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {JwtAuthGuard} from '../../auth/jwt.guard';

@Controller('v1/users')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async findUserByMail(@Req() req) {
        return await this.userService.findUserByMailAndReturnToken(req);
    }
}
