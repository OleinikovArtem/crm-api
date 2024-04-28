import { Field, ArgsType } from '@nestjs/graphql';

import { OrderProductInput } from '../models/order-product.model';
import { OrderBillingInfoInput } from '../models/order-billingInfo.model';

@ArgsType()
export class CreateOrderArgs {
  @Field(() => [OrderProductInput])
  products: OrderProductInput[];

  @Field(() => OrderBillingInfoInput)
  billingInfo: OrderBillingInfoInput;
}
