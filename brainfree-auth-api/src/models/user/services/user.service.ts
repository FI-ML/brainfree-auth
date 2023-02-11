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
import {User} from '../entites/user';
import * as argon2 from 'argon2';
import {UpdateUserDetailsDto} from '../dto/update.user.details.dto';

@Injectable()
export class UserService {
    constructor(private readonly userBackendService: UserBackendService,
                private readonly userMapper: UserMapperUtilsService,
                private readonly roleMapper: RoleMapperUtilsService,
                private readonly tokenService: TokenUtilsService) {
    }

    async findUserByMail(email: string): Promise<UserDto> {
        let user = await this.userBackendService.findUserByMail(email);

        this.ifUserNotExistException(user);

        user.roles = await this.userBackendService.findAllRolesByUser(user.email);

        return this.userMapper.entityToDto(user);
    }

    async findUserByMailAndReturnToken(request: Request) {

        const email = this.extractUserDetailsFromToken(request);

        const user = await this.userBackendService.findUserByMail(email);

        this.ifUserNotExistException(user);
        user.roles = await this.userBackendService.findAllRolesByUser(user.email);
        delete user.password;

        const userDto = this.userMapper.entityToDto(user);
        return this.tokenService.getTokens(userDto);
    }

    async findRolesByUser(request: Request) {
        const email = this.extractUserDetailsFromToken(request);
        let user = await this.userBackendService.findUserByMail(email);
        this.ifUserNotExistException(user);

        user.roles = await this.userBackendService.findAllRolesByUser(user.email);

        const userDto = this.userMapper.entityToDto(user);
        return this.tokenService.getTokens(userDto);
    }

    async create(signUpDto: SignupDto): Promise<UserDto> {

        const foundUser = await this.userBackendService.findUserByMail(signUpDto.email);

        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        let user = this.userMapper.signUpDtoToEntity(signUpDto);
        user.password = await this.hashPasswort(signUpDto.password);
        user.roles = this.getExtractedRolesFromDto(signUpDto.roles);
        user.refreshToken = ' ';
        user = await this.userBackendService.crate(user);
        user.roles = await this.userBackendService.findAllRolesByUser(user.email);
        return this.userMapper.entityToDto(user);
    }

    async delete(request: Request): Promise<void> {
        const email = this.extractUserDetailsFromToken(request);
        const foundUser = await this.userBackendService.findUserByMail(email);
        this.ifUserNotExistException(foundUser);
        await this.userBackendService.delete(foundUser.id);
    }

    async updateUserDetails(userDto: UpdateUserDetailsDto, request: Request) {

        const email = this.extractUserDetailsFromToken(request);

        let user = await this.userBackendService.findUserByMail(email);
        await this.isPasswordCorrect(userDto, user);

        user = this.userMapper.updateDtoToEntity(userDto);

        user.password = await argon2.hash(userDto.password);
        user = await this.userBackendService.update(user);

        const dto = this.userMapper.entityToDto(user);

        return this.tokenService.getTokens(dto);
    }


    async updateRefreshToken(email: string, refreshToken: string) {

        let hashedRefreshToken = null;

        if (refreshToken) {
            hashedRefreshToken = await argon2.hash(refreshToken);
        }

        const user = await this.userBackendService
            .updateUsersRefreshtoken(email, hashedRefreshToken);
        user.roles = await this.userBackendService.findAllRolesByUser(user.email);
        return this.userMapper.entityToDto(user);
    }

    private getExtractedRolesFromDto(createRoles: Array<CreateRoleDto>): Array<Role> {
        const roles: Array<Role> = [];

        createRoles.forEach(role => {
            const mappedRole = this.roleMapper.dtoToEntity(role);
            roles.push(mappedRole);
        });
        return roles;
    }

    //TODO: is a excaption class =)
    private ifUserNotExistException(foundUser: User) {
        if (!foundUser) {
            throw new NotFoundException(`Can't find user by this mail: ${foundUser.email}`);
        }
    }

    private async hashPasswort(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    private extractUserDetailsFromToken(request: Request): string {
        return request.user['email'];
    }


    private async isPasswordCorrect(dto: UpdateUserDetailsDto, user: User): Promise<void> {
        const isMatch = await argon2.verify(user.password, dto.oldPasswort);
        if (!isMatch) {
            throw new BadRequestException('Wrong user credentials');
        }
    }
}
