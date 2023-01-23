import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import {UserMappingService} from '../mapping/services/user.mapping.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserMappingService]
})
export class AuthModule {}
