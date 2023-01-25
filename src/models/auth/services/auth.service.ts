import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity} from '../entities/User.entity';
import {SignupDto} from '../dto/signup.dto';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {SigningDto} from '../dto/signingDto';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {


    constructor(private readonly userMappingService: UserMappingService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }

    async signup(signUpDto: SignupDto) {

        const foundUser = await this.findUserByMail(signUpDto.email);

        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        const user = this.userMappingService.dtoToEntity(signUpDto);
        user.password = await this.hashPassword(user.password);
        await UserEntity.save(user);


        const args = this.getUserDetails(user);
        const token = await this.signToken(args);
        return { token };
    }


    async singing(signingDto: SigningDto) {

        const foundUser = await this.findUserByMail(signingDto.email);

        if (!foundUser) {
            throw new BadRequestException(`Can't find user with email ${signingDto.email}`);
        }

        const isMatch = await bcrypt.compare(signingDto.password, foundUser.password);

        if (!isMatch) {
            throw new BadRequestException('Wrong credentials');
        }

        const args = this.getUserDetails(foundUser);
        return this.signToken(args);
    }


    async signOut() {
        return '';
    }

    async findUserByMail(mail: string): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {email: mail},
        });
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async signToken(args: { firstname: string, lastname: string, email: string }) {
        const payload = args;
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        return await this.jwtService.signAsync(payload, {secret: jwtSecret});
    }

    private getUserDetails(user: UserEntity) {
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        };
    }
}
