import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from './common/middleware/logger/logger.middleware';
import {ConfigModule} from '@nestjs/config';
import {validate} from './config/validations/env.validation';
import {AuthModule} from './models/auth/auth.module';
import {UtilsModule} from './models/utils/utils.module';
import {PostgresDatabaseProviderModule} from './providers/postgres.database.provider.module';
import {UserModule} from './models/user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {RoleModule} from './models/role/role.module';


@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({isGlobal: true, validate}),
        JwtModule,
        PassportModule,
        PostgresDatabaseProviderModule,
        RoleModule,
        UserModule,
        UtilsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
