import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';
import {UserMapperUtilsService} from '../../utils/services/mapping/user.mapper.utils.service';
import {UserDto} from '../../user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService,
                private readonly userMapper: UserMapperUtilsService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,

                //TODO: enable it
                /*  ExtractJwt.fromAuthHeaderAsBearerToken(),*/
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(user: UserDto) {
        return this.userMapper.dtoToPayload(user);
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token;
        }
        return null;
    }
}
