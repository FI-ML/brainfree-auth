import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UserService} from '../user/services/user.service';
import {UserModule} from '../user/user.module';
import {UserBackendService} from '../user/services/user-backend.service';
import {UserMappingService} from '../mapping/services/user.mapping.service';

@Module({
  imports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserBackendService, UserService, UserMappingService]
})
export class AuthModule {}
