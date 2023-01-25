import { Module } from '@nestjs/common';
import {UserBackendService} from './services/user-backend.service';
import {UserService} from './services/user.service';
import {UserMappingService} from '../mapping/services/user.mapping.service';

@Module({
    providers: [UserBackendService, UserService, UserMappingService],
})
export class UserModule {}
