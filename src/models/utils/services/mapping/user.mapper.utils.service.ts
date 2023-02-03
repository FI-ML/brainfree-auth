import { SignupDto } from '../../../auth/dto/signup.dto';
import { User } from '../../../user/entites/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetRoleDto } from '../../../role/dto/get.role.dto';
import { Role } from '../../../role/entities/role';
import { UpdateUserDetailsDto } from '../../../user/dto/update.user.details.dto';
import { CreateRoleDto } from '../../../role/dto/create.role.dto';

@Injectable()
export class UserMapperUtilsService {


  signUpDtoToEntity(dto: SignupDto): User {
    const user: User = User.create();
    user.firstname = dto.firstname;
    user.lastname = dto.lastname;
    user.email = dto.email;
    user.isActive = dto.isActive;
    return user;
  }


  updateDtoToEntity(dto: UpdateUserDetailsDto): User {
    const user: User = User.create();
    user.firstname = dto.firstname;
    user.lastname = dto.lastname;
    user.email = dto.email;
    user.isActive = dto.isActive;
    user.roles = this.getExtractedRolesFromDto(dto.roles);
    return user;
  }


  entityToDto(user: User) {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      roles: this.getExtractedRolesFromEntity(user.roles),
      isActive: user.isActive,
      refreshToken: user.refreshToken
    };
  }

  private getExtractedRolesFromEntity(createRoles: Array<Role>): Array<GetRoleDto> {

    if (!createRoles) {
      throw new NotFoundException(`Your roles are empty`);
    }

    const roles: Array<GetRoleDto> = [];
    createRoles.forEach(role => {

      let roleDto = new GetRoleDto();

      let index = JSON.stringify(role).indexOf(':') + 2;

      roleDto.name = JSON.stringify(role).substring(index, JSON.stringify(role).length - 2);

      roles.push(roleDto);
    });
    return roles;
  }

  private getExtractedRolesFromDto(dtoRoles: Array<CreateRoleDto>): Array<Role> {

    if (!dtoRoles) {
      throw new NotFoundException(`Your roles are empty`);
    }

    const roles: Array<Role> = [];

    dtoRoles.forEach(role => {
      let roleE = Role.create();
      roleE.name = role.name;
      roles.push(roleE);
    });

    return roles;
  }
}
