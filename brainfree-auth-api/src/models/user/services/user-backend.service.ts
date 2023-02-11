import { User } from '../entites/user';
import { Injectable } from '@nestjs/common';
import { Role } from '../../role/entities/role';
import { DeleteQueryBuilder } from 'typeorm';

@Injectable()
export class UserBackendService {

  async crate(user: User): Promise<User> {
    return await User.save(user);
  }


  async findUserByMail(email: string): Promise<User> {
    return await User.findOne({
      where: { email: email }
    });
  }

  async findAllRolesByUser(email: string): Promise<Array<Role>> {

    return await User
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .select(['roles.name AS role'])
      .where('user.email = :email', {
        email: email
      })
      .getRawMany();
  }

  async updateUsersRefreshtoken(email: string, refreshToken: string) {
    let user = await this.findUserByMail(email);
    user.refreshToken = refreshToken;
    return await User.save(user);
  }

  async delete(userId: string): Promise<DeleteQueryBuilder<User>> {
    return User
      .getRepository()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('user.id = :id', {
        id: userId
      });
  }


  //TODO: UPDATE NEED IF WHAT UPDATE FOR PROPERTY NEED
  async update(user: User) {

    const existRoles = await this.findAllRolesByUser(user.email);
    const roles = this.filterRolesIfExist(existRoles, user.roles);

    if (roles) {
      user.roles = roles;
    }

    return await User.save(user);
  }


  private filterRolesIfExist(existRoles: Array<Role>, updateRoles: Array<Role>) {

    if (existRoles.length < 1) {
      return updateRoles;
    }

    return updateRoles.filter((role) => !existRoles.includes(role));
  }

}
