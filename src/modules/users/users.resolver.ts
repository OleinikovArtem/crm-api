import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { RoleGuard } from '@modules/auth/role.guard';

import { RequestWithUser } from '@modules/auth/auth.types';
import { ROLE } from '.prisma/client';

import { User, UserWithoutPassword } from './user.model';
import { UsersService } from './users.service';
import { GetUserByEmail, GetUsersWithPaginationArgs, UsersOutput } from '@modules/users/dto/getUsers.args';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  // @UseGuards(RoleGuard([ROLE.EMPLOYEE, ROLE.ADMIN, ROLE.CLIENT]))
  // @Mutation(() => UserWithoutPassword, { name: 'profile' })
  // async updateProfile(
  //   @Context('req') req: RequestWithUser,
  //   @Args('input') input: UserWithoutPassword
  // ) {
  //   console.log(req.user);
  //   if (!req.user.email) {
  //     return new BadRequestException()
  //   }
  //   return this.usersService.updateUser(req.user.email, input);
  // }

  @UseGuards(RoleGuard([ROLE.EMPLOYEE, ROLE.CLIENT]))
  @Query(() => UserWithoutPassword, { name: 'profile' })
  async getProfile(@Context('req') req: RequestWithUser) {
    return this.usersService.findById(req.user.sub);
  }

  @UseGuards(RoleGuard([ROLE.EMPLOYEE, ROLE.ADMIN]))
  @Query(() => UsersOutput, { name: 'users' })
  async getUsers(@Args() args: GetUsersWithPaginationArgs) {
    return this.usersService.getUsers(args);
  }

  @UseGuards(RoleGuard([ROLE.EMPLOYEE, ROLE.ADMIN]))
  @Query(() => User, { name: 'user' })
  async getUser(@Args() args: GetUserByEmail) {
    return this.usersService.findByEmail(args.email);
  }
}
