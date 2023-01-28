import {User} from '../entites/user';
import {Injectable} from '@nestjs/common';
import {Role} from '../../role/entities/role';

@Injectable()
export class UserBackendService {

    async crateUser(user: User): Promise<User> {
        //    user.password = await this.hashPassword(user.password);
        return await User.save(user);
    }


    async findUserByMail(mail: string): Promise<User> {

        return await User.findOne({
            where: {email: mail},
        })
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
}
