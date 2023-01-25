import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity} from '../entites/User.entity';
import {UserBackendService} from './user-backend.service';
import {SignupDto} from '../../auth/dto/signup.dto';
import {UserMappingService} from '../../mapping/services/user.mapping.service';
import {UserDto} from '../dto/user.dto';

@Injectable()
export class UserService {


    constructor(private readonly userService: UserBackendService,
                private mappingService: UserMappingService) {
    }

    async createUser(signUpDto: SignupDto): Promise<UserDto>{

        const foundUser = await this.userService.findUserByMail(signUpDto.email);

        if(foundUser){
            throw new BadRequestException('Email already exists');
        }

        let user = this.mappingService.dtoToEntity(signUpDto);
        user = await this.userService.crateUser(user);

        return this.mappingService.entityToDto(user);
    }

    async findUserByMail(mail: string): Promise<UserDto>{

        const user = await this.userService.findUserByMail(mail);

        if (!user) {
            throw new BadRequestException(`Can't find user with email ${mail}`);
        }

        return this.mappingService.entityToDto(user);
    }
}
