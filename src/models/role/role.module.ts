import {Module} from '@nestjs/common';
import {RoleBackendService} from './services/role.backend.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [],
    providers: [RoleBackendService]
})

export class RoleModule {
}
