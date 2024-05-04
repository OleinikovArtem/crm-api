import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthResponse } from './tokens.model';
import { User } from '@modules/users/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args({ name: 'email', type: () => String! }) email: string,
    @Args({ name: 'password', type: () => String! }) password: string,
  ) {
    return this.authService.signIn({ email, password });
  }

  @Mutation(() => AuthResponse, { name: 'registration' })
  async registration(
    @Args({ name: 'email', type: () => String! }) email: string,
    @Args({ name: 'password', type: () => String! }) password: string,
    @Args({ name: 'name', type: () => String! }) name: string,
  ) {
    return this.authService.singUp({ email, password, name });
  }

  // TODO remove
  @Mutation(() => User, { name: 'makeAdmin' })
  async makeAdmin(@Args({ name: 'email', type: () => String! }) email: string) {
    return this.authService.makeAdmin(email);
  }

  @Mutation(() => AuthResponse, { name: 'refreshToken' })
  async refreshToken(
    @Args({ name: 'refreshToken', type: () => String! }) token: string,
  ) {
    return this.authService.refreshToken(token);
  }
}
