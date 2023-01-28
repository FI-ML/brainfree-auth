import {SignupDto} from '../../../auth/dto/signup.dto';
import {User} from '../../../user/entites/user';
import {Injectable, NotFoundException} from '@nestjs/common';
import {UserDto} from '../../../user/dto/user.dto';
import {GetRoleDto} from '../../../role/dto/get.role.dto';
import {Role} from '../../../role/entities/role';

@Injectable()
export class UserMapperUtilsService {


    dtoToEntity(dto: SignupDto): User {
        const user: User = User.create();
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.email = dto.email;
        user.password = dto.password;
        user.isActive = dto.isActive;
        return user;
    }

    entityToDto(user: User) {
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            roles: this.getExtractedRolesFromDto(user.roles),
            isActive: user.isActive
        }
    }

    dtoToPayload(user: UserDto) {
        return {firstname: user.firstname, lastname: user.lastname, email: user.email, roles: user.roles};
    }

    //TODO: Global is present Utils
    private getExtractedRolesFromDto(createRoles: Array<Role>): Array<GetRoleDto> {

        if (!createRoles) {
            throw new NotFoundException(`Your roles are empty`);
        }

        const roles: Array<GetRoleDto> = [];
        createRoles.map(role => role.name).forEach(name => {
            roles.push({name: name});
        });
        return roles;
    }
}
