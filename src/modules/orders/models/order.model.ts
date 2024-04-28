import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Order as OrderDB } from '@prisma/client';

import { User } from 'src/modules/users/user.model';

import { OrderProduct } from './order-product.model';
import { TotalPrice } from './total-price.model';
import { OrderBillingInfo } from './order-billingInfo.model';

@ObjectType()
export class Order {
  @Field(() => String)
  id: OrderDB['id'];

  @Field(() => GraphQLISODateTime)
  createdAt: OrderDB['createdAt'];

  @Field(() => GraphQLISODateTime)
  updatedAt: OrderDB['updatedAt'];

  @Field(() => User, { nullable: true })
  customer: User | null;

  @Field(() => [OrderProduct])
  products: OrderProduct[];

  @Field(() => String)
  status: OrderDB['status'];

  @Field(() => OrderBillingInfo)
  billingInfo: OrderBillingInfo;

  @Field(() => TotalPrice)
  totalPrice: TotalPrice;
}
