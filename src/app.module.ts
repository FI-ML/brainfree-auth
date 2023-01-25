import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from './common/middleware/logger/logger.middleware';
import {ConfigModule} from '@nestjs/config';
import {validate} from './config/validations/env.validation';
import {AuthModule} from './models/auth/auth.module';
import {MappingModule} from './models/mapping/mapping.module';
import {PostgresDatabaseProviderModule} from './providers/postgres.database.provider.module';
import {UserModule} from './models/user/user.module';


@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, validate}),
        AuthModule,
        MappingModule,
        PostgresDatabaseProviderModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
