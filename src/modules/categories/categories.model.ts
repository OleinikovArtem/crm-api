import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Category as CategoryDB } from '@prisma/client';
import { Product } from 'src/modules/products/products.model';

@ObjectType()
export class Category {
  @Field(() => String)
  id: CategoryDB['id'];

  @Field(() => String)
  name: CategoryDB['name'];

  @Field(() => GraphQLISODateTime)
  createdAt: CategoryDB['createdAt'];

  @Field(() => GraphQLISODateTime)
  updatedAt: CategoryDB['updatedAt'];

  @Field(() => [Product], { nullable: true })
  products: Product[]
}
