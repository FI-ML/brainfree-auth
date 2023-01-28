import {User} from '../entites/user';
import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserBackendService {

    async crateUser(user: User): Promise<User> {
        //    user.password = await this.hashPassword(user.password);
        return await User.save(user);
    }


    async findUserByMail(mail: string): Promise<User> {
        return await User.findOne({
            where: {email: mail},
        });
    }

    async findAllRolesByUser(email: string): Promise<void> {

        const roleNames =
            await User
                .getRepository()
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'roles')
                .select(['roles.name AS role'])
                .where('user.email = :email', {
                    email: email
                })
                .getRawMany();

        console.log(JSON.stringify(roleNames))
    }

    private async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}
