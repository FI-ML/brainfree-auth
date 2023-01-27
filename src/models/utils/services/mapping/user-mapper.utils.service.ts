import {SignupDto} from '../../../auth/dto/signup.dto';
import {UserEntity} from '../../../user/entites/User.entity';
import {Injectable} from '@nestjs/common';
import {UserDto} from '../../../user/dto/user.dto';

@Injectable()
export class UserMapperUtilsService {

    dtoToEntity(dto: SignupDto): UserEntity {
        const user: UserEntity = UserEntity.create();

        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.email = dto.email;
        user.password = dto.password;
        user.isActive = dto.isActive;
        return user;
    }

    entityToDto(user: UserEntity) {
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            isActive: user.isActive
        }
    }

    dtoToPayload(user: UserDto) {
        return {firstname: user.firstname, lastname: user.lastname, email: user.email};
    }
}
