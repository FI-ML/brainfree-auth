import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {Request, Response} from 'express';
import {SignupDto} from '../dto/signup.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {SigningDto} from '../dto/signingDto';
import {UserService} from '../../user/services/user.service';
import {UserDto} from '../../user/dto/user.dto';
import {TokenUtilsService} from '../../utils/services/token/token.utils.service';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService,
                private readonly tokenService: TokenUtilsService) {
    }

    async signUp(signUpDto: SignupDto) {

        const user = await this.userService.createUser(signUpDto);
        const token = await this.tokenService.signToken(user);

        return {token};
    }


    async signIn(signingDto: SigningDto, request: Request, response: Response): Promise<Response> {

        const user = await this.userService.findUserByMail(signingDto.email);

        await this.isPasswordCorrect(signingDto, user);

        const token = await this.tokenService.signToken(user);

        if (!token) {
            throw new ForbiddenException();
        }

        response.cookie('token', token);

        return response.send({message: 'Logged in successfully'});
    }

    async signOut(request: Request, response: Response): Promise<Response> {
        response.clearCookie('token');
        return response.send({message: 'Logged out successfully'});
    }

    private async isPasswordCorrect(signingDto: SigningDto, user: UserDto) {
        const isMatch = await bcrypt.compare(signingDto.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Wrong credentials');
        }
    }

}
