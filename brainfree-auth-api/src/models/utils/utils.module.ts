import {Module} from '@nestjs/common';
import {UserMapperUtilsService} from './services/mapping/user.mapper.utils.service';
import {RoleMapperUtilsService} from './services/mapping/role.mapper.utils.service';

@Module({
    providers: [UserMapperUtilsService, RoleMapperUtilsService],
})
export class UtilsModule {
}
