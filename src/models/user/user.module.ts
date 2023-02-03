import { Module } from '@nestjs/common';
import { UserBackendService } from './services/user-backend.service';
import { UserService } from './services/user.service';
import { UserMapperUtilsService } from '../utils/services/mapping/user.mapper.utils.service';
import { UserController } from './controller/user.controller';
import { TokenUtilsService } from '../utils/services/token/token.utils.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleMapperUtilsService } from '../utils/services/mapping/role.mapper.utils.service';
import { AccessTokenStrategy } from '../auth/strategies/accessToken/accessToken.strategy';
import { RefreshTokenStrategy } from '../auth/strategies/refreshToken/refreshToken.strategy';

@Module({
  imports: [JwtModule],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RoleMapperUtilsService,
    TokenUtilsService,
    UserBackendService,
    UserMapperUtilsService,
    UserService],
  controllers: [UserController]
})
export class UserModule {
}
