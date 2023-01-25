import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {Request, Response} from 'express';
import {UserEntity} from '../../user/entites/User.entity';
import {SignupDto} from '../dto/signup.dto';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {SigningDto} from '../dto/signingDto';
import {ConfigService} from '@nestjs/config';
import {UserService} from '../../user/services/user.service';
import {UserDto} from '../../user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
                private readonly configService: ConfigService,
                private readonly userService: UserService) {
    }

    async signUp(signUpDto: SignupDto) {

        const user = await this.userService.createUser(signUpDto);
        const token = await this.signToken(user);

        return {token};
    }


    async signIn(signingDto: SigningDto, request: Request, response: Response):Promise<Response> {

        const user = await this.userService.findUserByMail(signingDto.email);

        await this.isPasswordCorrect(signingDto, user);

        const token = await this.signToken(user);

        if(!token){
            throw new ForbiddenException();
        }

        response.cookie('token', token);

        return response.send({message: 'Logged in successfully'});
    }

    async signOut(request: Request, response: Response):Promise<Response> {
        response.clearCookie('token')
        return response.send({message:'Logged out successfully'});
    }

    async signToken(user: UserDto): Promise<string> {
        const payload = {firstname: user.firstname, lastname: user.lastname, email: user.email};
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        return await this.jwtService.signAsync(payload, {secret: jwtSecret});
    }
    private async isPasswordCorrect(signingDto: SigningDto, user: UserDto) {
        const isMatch = await bcrypt.compare(signingDto.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Wrong credentials');
        }
    }

}
