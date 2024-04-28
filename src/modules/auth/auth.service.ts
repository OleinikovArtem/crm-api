import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UsersService } from 'src/modules/users/users.service';
import { CreateTokensInput, SignInInput, SignUpInput, Tokens } from './auth.types';


import { authConfig } from 'src/config/auth.config';

const { access_token_secret_key, refresh_token_secret_key } = authConfig();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async singUp({ email, password, name }: SignUpInput): Promise<Tokens> {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);
    if (!isValidEmail) throw new BadRequestException('Invalid email format');

    const existUser = await this.usersService.findByEmail(email);
    if (existUser) throw new BadRequestException('The user already exists');

    const newUser = await this.usersService.createUser({ email, password, name });

    const payload = this.createPayloadForCreateTokens(newUser);

    return await this.createTokens(payload);
  }

  async signIn({ email, password }: SignInInput): Promise<Tokens> {
    const user = await this.usersService.findByEmail(email);
    const isValidPassword = await this.usersService.comparePassword(user?.password, password);

    if (!user || !isValidPassword) throw new UnauthorizedException();

    const payload = this.createPayloadForCreateTokens(user);

    return await this.createTokens(payload);
  }

  async refreshToken(token: string): Promise<Tokens> {
    try {
      const result = await this.jwtService.verify(token, { secret: refresh_token_secret_key });
      const user = await this.usersService.findById(result.sub);

      if (!user) throw new UnauthorizedException();

      const payload = this.createPayloadForCreateTokens(user);
      return await this.createTokens(payload);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // TODO remove
  async makeAdmin(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return await this.usersService.makeAdmin(email);
  }

  private async createTokens({ refreshPayload, accessPayload }: CreateTokensInput): Promise<Tokens> {
    return {
      access_token: await this.jwtService.signAsync(accessPayload, {
        secret: access_token_secret_key,
        expiresIn: '1h',
      }),
      refresh_token: await this.jwtService.signAsync(refreshPayload, {
        secret: refresh_token_secret_key,
        expiresIn: '7d',
      }),
    };
  }

  private createPayloadForCreateTokens(user: User): CreateTokensInput {
    const accessPayload = { sub: user.id, email: user.email, name: user.name, role: user.role } as const;
    const refreshPayload = { sub: user.id };

    return {
      refreshPayload,
      accessPayload,
    };
  }
}
