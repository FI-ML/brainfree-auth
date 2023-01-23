import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity} from '../entities/User.entity';
import {SignupDto} from '../dto/signup.dto';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {jwtSecret} from '../../../common/constants/constants'
import {SigningDto} from '../dto/signingDto';

@Injectable()
export class AuthService {


    constructor(private readonly userMappingService: UserMappingService,
                private readonly jwtService: JwtService) {
    }

    async signup(signUpDto: SignupDto) {

        const foundUser = await this.findUserByMail(signUpDto.email);

        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        const user = this.userMappingService.dtoToEntity(signUpDto);
        user.password = await this.hashPassword(user.password);
        await UserEntity.save(user);


        return this.signToken(user);
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

        return this.signToken(foundUser);
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

    async signToken(args: UserEntity) {

        return await this.jwtService.signAsync(args, {secret: jwtSecret})
    }
}
