import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '@pagination/pagination.args';
import { GeneratePaginationOutput } from '@pagination/pagination.output';

import { Product } from '../products.model';

@ArgsType()
export class GetProductsWithPaginationArgs extends PaginationArgs {
  @Field(() => [String], { nullable: true })
  categories?: string[];
}


export const ProductsOutput = GeneratePaginationOutput<Product>(Product);
