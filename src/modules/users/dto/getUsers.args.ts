import { ArgsType, Field, Int } from '@nestjs/graphql';

import { PaginationArgs } from '@pagination/pagination.args';
import { GeneratePaginationOutput } from '@pagination/pagination.output';

import { UserWithoutPassword } from '../user.model';

@ArgsType()
export class GetUsersWithPaginationArgs extends PaginationArgs {
}

@ArgsType()
export class GetUserByEmail {
  @Field(() => String,{ nullable: false })
  email: string
}


export const UsersOutput = GeneratePaginationOutput<UserWithoutPassword>(UserWithoutPassword);
