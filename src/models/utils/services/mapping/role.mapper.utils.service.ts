import {Injectable} from '@nestjs/common';
import {Role} from '../../../role/entities/role';
import {CreateRoleDto} from '../../../role/dto/create.role.dto';
import {GetRoleDto} from '../../../role/dto/get.role.dto';

@Injectable()
export class RoleMapperUtilsService {

    entityToDto(role: Role): GetRoleDto {
        return {
            name: role.name
        }
    }

    dtoToEntity(dto: CreateRoleDto) {
        const role = Role.create();
        role.name = dto.name;
        return role;
    }
}
