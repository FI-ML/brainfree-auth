import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [],
    providers: []
})

export class RoleModule {
}
