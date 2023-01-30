import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBackendService } from './user-backend.service';
import { SignupDto } from '../../auth/dto/signup.dto';
import { UserMapperUtilsService } from '../../utils/services/mapping/user.mapper.utils.service';
import { UserDto } from '../dto/user.dto';
import { Request } from 'express';
import { TokenUtilsService } from '../../utils/services/token/token.utils.service';
import { RoleMapperUtilsService } from '../../utils/services/mapping/role.mapper.utils.service';
import { CreateRoleDto } from '../../role/dto/create.role.dto';
import { Role } from '../../role/entities/role';
import { User } from '../entites/user';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userBackendService: UserBackendService,
              private readonly userMapper: UserMapperUtilsService,
              private readonly roleMapper: RoleMapperUtilsService,
              private readonly tokenService: TokenUtilsService) {
  }

  async findUserByMail(email: string): Promise<UserDto> {
    const user = await this.userBackendService.findUserByMail(email);
    this.ifUserNotExistException(user);
    return this.userMapper.entityToDto(user);
  }

  //Todo: is token valid
  async findUserByMailAndReturnToken(request: Request) {
    const decodedUser = this.getUserFromToken(request);

    const user = await this.userBackendService.findUserByMail(decodedUser.email);

    this.ifUserNotExistException(user);

    delete user.password;

    const userDto = this.userMapper.entityToDto(user);
    return this.tokenService.getTokens(userDto);
  }

  async findRolesByUser(request: Request) {
    const decodedUser = this.getUserFromToken(request);
    await this.userBackendService.findAllRolesByUser(decodedUser.email);
  }

  //TODO: TOKEN DTO
  //TODO: REFRESH TOKEN
  //  BEARER TOKEN
  // REFRESH TOKEN
  async create(signUpDto: SignupDto): Promise<UserDto> {

    const foundUser = await this.userBackendService.findUserByMail(signUpDto.email);

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    let user = this.userMapper.dtoToEntity(signUpDto);

    user.roles = this.getExtractedRolesFromDto(signUpDto.roles);
    user.refreshToken = 'xxx';
    user = await this.userBackendService.crate(user);
    return this.userMapper.entityToDto(user);
  }

  async delete(email: string): Promise<void> {
    const foundUser = await this.userBackendService.findUserByMail(email);

    this.ifUserNotExistException(foundUser);

    await this.userBackendService.delete(foundUser.id);
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userBackendService
      .updateUsersRefreshtoken(email, hashedRefreshToken);
  }


  private getUserFromToken(request: Request) {
    return request.user as { email: string };
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
      throw new BadRequestException(`Can't find user by this mail: ${foundUser.email}`);
    }
  }
}
