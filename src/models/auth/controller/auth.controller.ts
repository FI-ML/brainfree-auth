import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {UserMapperUtilsService} from '../../utils/services/mapping/user.mapper.utils.service';
import {SignupDto} from '../dto/signup.dto';
import {SigningDto} from '../dto/signingDto';


@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userMappingService: UserMapperUtilsService) {
    }

    @Post('signup')
    async signup(@Body() signUpDto: SignupDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('singing')
    async singing(@Body() signingDto: SigningDto, @Req() req, @Res() res) {
        return await this.authService.signIn(signingDto, req, res);
    }


    @Get('sign-out')
    async signOut(@Req() req, @Res() res) {
        return await this.authService.signOut(req, res);
    }

}
