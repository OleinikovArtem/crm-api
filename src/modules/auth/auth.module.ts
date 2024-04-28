import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { UsersModule } from 'src/modules/users/users.module';
import { authConfig } from 'src/config/auth.config';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: authConfig().access_token_secret_key,
    signOptions: { expiresIn: '1h' },
  })],
})
export class AuthModule {
}
