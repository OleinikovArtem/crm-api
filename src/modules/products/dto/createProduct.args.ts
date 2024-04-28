import { ArgsType, Field, Float, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateProductArgs {
  @Field(() => String!,{ nullable: false })
  name: string

  @Field(() => String!,{ nullable: false })
  description: string

  @Field(() => String!,{ nullable: false })
  imageUrl: string

  @Field(() => Float!,{ nullable: false })
  price: number

  @Field(() => Int!,{ nullable: false })
  count: number

  @Field(() => [String],{ nullable: true })
  categories?: string[]
}




