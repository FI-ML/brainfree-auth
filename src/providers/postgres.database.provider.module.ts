import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {User} from '../models/user/entites/user';
import {Role} from '../models/role/entities/role';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [User, Role],
                synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
                logging: true,
            }),
            inject: [ConfigService],
        }),
    ]
})
export class PostgresDatabaseProviderModule {
}
