import {UserEntity} from '../entites/User.entity';
import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserBackendService {

    async crateUser(user: UserEntity): Promise<UserEntity> {
        user.password = await this.hashPassword(user.password);
        return await UserEntity.save(user);
    }

    async findUserByMail(mail: string): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {email: mail},
        });
    }


    private async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}
