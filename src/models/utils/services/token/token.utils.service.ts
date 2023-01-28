import {Injectable} from '@nestjs/common';
import {UserDto} from '../../../user/dto/user.dto';
import {UserMapperUtilsService} from '../mapping/user.mapper.utils.service';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class TokenUtilsService {

    constructor(private readonly userMapperService: UserMapperUtilsService,
                private readonly configService: ConfigService,
                private readonly jwtService: JwtService) {
    }

    async signToken(user: UserDto): Promise<string> {
        const payload = this.userMapperService.dtoToPayload(user);
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        return await this.jwtService.signAsync(payload, {secret: jwtSecret});
    }
}
