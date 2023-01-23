import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {LoggerMiddleware} from './common/logger/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/validations/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
        logging: configService.get<boolean>('DB_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
