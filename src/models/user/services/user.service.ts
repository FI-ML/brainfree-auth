import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserBackendService} from './user-backend.service';
import {SignupDto} from '../../auth/dto/signup.dto';
import {UserMapperUtilsService} from '../../utils/services/mapping/user-mapper.utils.service';
import {UserDto} from '../dto/user.dto';
import {Request} from 'express';
import {TokenUtilsService} from '../../utils/services/token/token.utils.service';

@Injectable()
export class UserService {


    constructor(private readonly userService: UserBackendService,
                private readonly mappingService: UserMapperUtilsService,
                private readonly tokenService: TokenUtilsService) {
    }

    async findUserByMail(email: string) {
        const user = await this.userService.findUserByMail(email);
        if (!user) {
            throw new NotFoundException(`Can't find user with email ${email}`);
        }
        return this.mappingService.entityToDto(user);
    }

    //Todo: is token valid
    async findUserByMailAndReturnToken(request: Request) {
        const decodedUser = this.getUserFromToken(request);

        const user = await this.userService.findUserByMail(decodedUser.email);

        if (!user) {
            throw new NotFoundException(`Can't find user with email ${decodedUser.email}`);
        }

        delete user.password;

        return this.tokenService.signToken(user);
    }


    async createUser(signUpDto: SignupDto): Promise<UserDto> {
        const foundUser = await this.userService.findUserByMail(signUpDto.email);
        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }
        let user = this.mappingService.dtoToEntity(signUpDto);
        user = await this.userService.crateUser(user);

        return this.mappingService.entityToDto(user);
    }

    private getUserFromToken(request: Request) {
        return request.user as { email: string };
    }
}
