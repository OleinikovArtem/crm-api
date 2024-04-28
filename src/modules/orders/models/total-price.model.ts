import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalPrice {
  @Field(() => Float)
  value: number;

  @Field(() => String)
  currency: string;
}
