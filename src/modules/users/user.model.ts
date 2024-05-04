import {
  Field,
  GraphQLISODateTime,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { User as UserDB } from '.prisma/client';

@ObjectType()
export class UserWithoutPassword {
  @Field(() => String)
  id: UserDB['id'];

  @Field(() => GraphQLISODateTime)
  createdAt: UserDB['createdAt'];

  @Field(() => GraphQLISODateTime)
  updatedAt: UserDB['updatedAt'];

  @Field(() => GraphQLISODateTime)
  emailVerified: UserDB['emailVerified'];

  @Field(() => String)
  name: UserDB['name'];

  @Field(() => String)
  email: UserDB['email'];

  @Field(() => String, { nullable: true })
  image: UserDB['image'];

  @Field(() => String, { nullable: true })
  phone: UserDB['phone'];

  @Field(() => String)
  role: UserDB['role'];
}

@ObjectType()
export class User extends UserWithoutPassword {
  @Field(() => String)
  password: UserDB['password'];
}
