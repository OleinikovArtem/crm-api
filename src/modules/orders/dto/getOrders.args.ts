import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@pagination/pagination.args';

import { Order } from '../models/order.model';
import { GeneratePaginationOutput } from '@pagination/pagination.output';

@ArgsType()
export class GetOrdersWithPaginationArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  email?: string;
}

export const OrderOutput = GeneratePaginationOutput<Order>(Order);
