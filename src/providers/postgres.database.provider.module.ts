import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from '../config/typeorm/type.orm.config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [ConfigService]
    })
  ]
})
export class PostgresDatabaseProviderModule {
}
