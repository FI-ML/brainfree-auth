import {Module} from '@nestjs/common';
import {UserBackendService} from './services/user-backend.service';
import {UserService} from './services/user.service';
import {UserMapperUtilsService} from '../utils/services/mapping/user.mapper.utils.service';
import {UserController} from './controller/user.controller';
import {TokenUtilsService} from '../utils/services/token/token.utils.service';
import {JwtModule} from '@nestjs/jwt';
import {RoleBackendService} from '../role/services/role.backend.service';
import {RoleMapperUtilsService} from '../utils/services/mapping/role.mapper.utils.service';

@Module({
    imports: [JwtModule],
    providers: [UserBackendService,
        UserService,
        UserMapperUtilsService,
        TokenUtilsService,
        RoleBackendService,
        RoleMapperUtilsService],
    controllers: [UserController]
})
export class UserModule {
}
