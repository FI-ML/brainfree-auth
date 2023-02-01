import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { UserBackendService } from '../user/services/user-backend.service';
import { UserMapperUtilsService } from '../utils/services/mapping/user.mapper.utils.service';
import { TokenUtilsService } from '../utils/services/token/token.utils.service';
import { RoleMapperUtilsService } from '../utils/services/mapping/role.mapper.utils.service';


//TODO: Refresh and access token
@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserBackendService,
    UserService,
    UserMapperUtilsService,
    TokenUtilsService,
    RoleMapperUtilsService
  ]
})
export class AuthModule {
}
