import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/modules/products/products.model';
import { OrderProduct as OrderProductDB } from '@prisma/client';

@InputType()
export class OrderProductInput {
  @Field(() => String)
  productId: Product['id'];

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class OrderProduct {
  @Field(() => String)
  id: OrderProductDB['id'];

  @Field(() => String)
  productId: Product['id'];

  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  count: number;
}
