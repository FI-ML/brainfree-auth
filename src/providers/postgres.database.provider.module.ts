import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {UserEntity} from '../models/user/entites/User.entity';

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
                entities: [UserEntity],
                synchronize: false,
                logging: configService.get<boolean>('DB_LOGGING'),
            }),
            inject: [ConfigService],
        }),
    ]
})
export class PostgresDatabaseProviderModule {}
