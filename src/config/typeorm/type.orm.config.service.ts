import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../models/user/entites/user';
import { Role } from '../../models/role/entities/role';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, Role],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZATION'),
      logging: false
    };
  }
}
