import { User } from '../entites/user';
import { Injectable } from '@nestjs/common';
import { Role } from '../../role/entities/role';
import { DeleteQueryBuilder } from 'typeorm';

@Injectable()
export class UserBackendService {

  async crate(user: User): Promise<User> {
    return await User.save(user);
  }


  async findUserByMail(mail: string): Promise<User> {

    let user = await User.findOne({
      where: { email: mail }
    });

    if (user) {
      user.roles = await this.findAllRolesByUser(user.email);
    }
    return user;
  }

  async findAllRolesByUser(email: string): Promise<Array<Role>> {
    return await User
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .select(['roles.name AS role'])
      .where('user.email = :email', {
        email: email
      })
      .getRawMany();

  }

  async updateUsersRefreshtoken(email: string, refreshToken: string) {
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

}
