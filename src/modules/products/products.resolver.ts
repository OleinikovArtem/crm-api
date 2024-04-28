import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '@modules/auth/role.guard';
import { ROLE } from '.prisma/client';

import { Product } from './products.model';
import { ProductsService } from './products.service';

// DTO
import { GetProductsWithPaginationArgs, ProductsOutput } from './dto/getProducts.args';
import { GetProductArgs } from './dto/getProduct.args';
import { CreateProductArgs } from './dto/createProduct.args';
import { UpdateProductArgs } from './dto/updateProduct.args';


@Resolver()
export class ProductResolver {
  constructor(private readonly productsService: ProductsService) {
  }

  @Query(() => ProductsOutput, { name: 'products' })
  async getProducts(@Args() args: GetProductsWithPaginationArgs) {
    return this.productsService.getProducts(args);
  }

  @Query(() => Product, { name: 'product' })
  async getProduct(@Args() args: GetProductArgs) {
    return this.productsService.getProductById(args.id);
  }


  @Mutation(() => Product)
  @UseGuards(RoleGuard([ROLE.ADMIN]))
  async createProduct(@Args() args: CreateProductArgs) {
    return this.productsService.createProduct(args);
  }

  @Mutation(() => Product)
  @UseGuards(RoleGuard([ROLE.ADMIN]))
  async updateProduct(@Args() args: UpdateProductArgs) {
    return this.productsService.updateProduct(args);
  }
}
