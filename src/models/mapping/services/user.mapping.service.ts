import {SignupDto} from '../../auth/dto/signup.dto';
import {UserEntity} from '../../auth/entities/User.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserMappingService{

    dtoToEntity(dto: SignupDto): UserEntity{
        const user:UserEntity = UserEntity.create();

        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.email = dto.email;
        user.password = dto.password;

        return user;
    }

}
