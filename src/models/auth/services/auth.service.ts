import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SignupDto } from '../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SigningDto } from '../dto/signingDto';
import { UserService } from '../../user/services/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { TokenUtilsService } from '../../utils/services/token/token.utils.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
              private readonly tokenService: TokenUtilsService) {
  }

  async signUp(signUpDto: SignupDto) {

    const user = await this.userService.create(signUpDto);
    const tokens = await this.tokenService.getTokens(user);

    await this.userService.updateRefreshToken(user.email, tokens.refreshToken);

    return tokens;
  }

  async signIn(signingDto: SigningDto) {
    const user = await this.userService.findUserByMail(signingDto.email);

    await this.isPasswordCorrect(signingDto, user);

    const tokens = await this.tokenService.getTokens(user);

    if (!tokens.refreshToken || !tokens.accessToken) {
      throw new ForbiddenException();
    }

    await this.userService.updateRefreshToken(user.email, tokens.refreshToken);

    return tokens;
  }

  async logout(email: string): Promise<void> {
    await this.userService.updateRefreshToken(email, null);
  }

  private async isPasswordCorrect(signingDto: SigningDto, user: UserDto) {
    const isMatch = await argon2.verify(signingDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong user credentials');
    }
  }

  async refreshTokens(request: Request) {
    const email = request.user['email'];
    const refreshToken = request.user['refreshToken'];

    const user = await this.userService.findUserByMail(email);

    await this.tokenService.isRefreshTokenValid(user, refreshToken);

    const tokens = await this.tokenService.getTokens(user);
    await this.userService.updateRefreshToken(user.email, tokens.refreshToken);
  }
}
