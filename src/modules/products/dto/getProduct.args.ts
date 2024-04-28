import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetProductArgs {
  @Field(() => String,{ nullable: false })
  id: string
}




