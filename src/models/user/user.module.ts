import {Module} from '@nestjs/common';
import {UserBackendService} from './services/user-backend.service';
import {UserService} from './services/user.service';
import {UserMapperUtilsService} from '../utils/services/mapping/user-mapper.utils.service';
import {UserController} from './controller/user.controller';
import {TokenUtilsService} from '../utils/services/token/token.utils.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    providers: [UserBackendService, UserService, UserMapperUtilsService, TokenUtilsService],
    controllers: [UserController]
})
export class UserModule {
}
