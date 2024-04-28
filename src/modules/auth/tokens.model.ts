import { Field, ObjectType } from '@nestjs/graphql';
import { Tokens } from './auth.types';

@ObjectType()
export class AuthResponse {
  @Field(() => String!)
  access_token: Tokens['access_token'];

  @Field(() => String!)
  refresh_token: Tokens['refresh_token'];
}
