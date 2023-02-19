import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserDto} from '../../../user/dto/user.dto';
import {UserMapperUtilsService} from '../mapping/user.mapper.utils.service';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {GetRoleDto} from '../../../role/dto/get.role.dto';
import {TokenDto} from '../../../auth/dto/token.dto';
import {RoleDto} from '../../../auth/dto/role.dto';

@Injectable()
export class TokenUtilsService {

    constructor(private readonly userMapperService: UserMapperUtilsService,
                private readonly configService: ConfigService,
                private readonly jwtService: JwtService) {
    }

    async getTokens(user: UserDto): Promise<TokenDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    roles: this.mapToJson(user.roles)
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m'
                }
            ),
            this.jwtService.signAsync(
                {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    roles: this.mapToJson(user.roles)
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d'
                }
            )
        ]);

        return this.mapToToken(accessToken, refreshToken);
    }


    async isRefreshTokenValid(user: UserDto, refreshToken: string): Promise<void> {
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    }

    //TODO: is access token valid


    private mapToJson(roles: Array<GetRoleDto>) {
        let counter = 1;
        let outputArray: RoleDto[] = [];

        roles.forEach(role => {
            outputArray.push(
                new RoleDto(counter, role.name)
            )
            counter++;
        })

        return outputArray;
    }

    private mapToToken(accessToken: string, refreshToken: string): TokenDto {
        const token: TokenDto = new TokenDto();
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        return token;
    }
}


