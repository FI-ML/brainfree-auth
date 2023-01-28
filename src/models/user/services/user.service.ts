import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserBackendService} from './user-backend.service';
import {SignupDto} from '../../auth/dto/signup.dto';
import {UserMapperUtilsService} from '../../utils/services/mapping/user.mapper.utils.service';
import {UserDto} from '../dto/user.dto';
import {Request} from 'express';
import {TokenUtilsService} from '../../utils/services/token/token.utils.service';
import {RoleMapperUtilsService} from '../../utils/services/mapping/role.mapper.utils.service';
import {CreateRoleDto} from '../../role/dto/create.role.dto';
import {Role} from '../../role/entities/role';
import {RoleBackendService} from '../../role/services/role.backend.service';

@Injectable()
export class UserService {
    constructor(private readonly userService: UserBackendService,
                private readonly userMapper: UserMapperUtilsService,
                private readonly roleMapper: RoleMapperUtilsService,
                private readonly tokenService: TokenUtilsService,
                private readonly roleBackendService: RoleBackendService) {
    }

    async findUserByMail(email: string) {
        const user = await this.userService.findUserByMail(email);
        if (!user) {
            throw new NotFoundException(`Can't find user with email ${email}`);
        }
        return this.userMapper.entityToDto(user);
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

    async findRolesByUser(request: Request) {
        const decodedUser = this.getUserFromToken(request);
        await this.userService.findAllRolesByUser(decodedUser.email);
    }

    //TODO: Rausfinden wie man ManyToMany relationen erzeugt
    //TODO: Rollen müssen in den token gemappt werden
    //TODO: Jeder Service gibt tolen nach ausßen?
    //TODO: TOKEN DTO
    //TODO: REFRESH TOKEN
    //  BEARER TOKEN
    // REFRESH TOKEN
    async createUser(signUpDto: SignupDto): Promise<UserDto> {

        const foundUser = await this.userService.findUserByMail(signUpDto.email);
        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        let user = this.userMapper.dtoToEntity(signUpDto);

        user.roles = this.getExtractedRolesFromDto(signUpDto.roles);
        user = await this.userService.crateUser(user);

        await this.roleBackendService.create(user.roles);

        return this.userMapper.entityToDto(user);
    }


    //TODO: Create DTO
    private getUserFromToken(request: Request) {
        return request.user as { email: string };
    }

    private getExtractedRolesFromDto(createRoles: Array<CreateRoleDto>) {
        const roles: Array<Role> = [];

        createRoles.forEach(role => {
            const mappedRole = this.roleMapper.dtoToEntity(role);
            roles.push(mappedRole);
        });
        return roles;
    }

}
