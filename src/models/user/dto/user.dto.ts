import {GetRoleDto} from '../../role/dto/get.role.dto';

export interface UserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isActive: boolean;
    roles: Array<GetRoleDto>;
}
