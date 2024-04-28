import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

import { ProductsService } from '../products/products.service';
import { OrdersRepository } from './orders.repository';

import { CreateOrderArgs } from './dto/createOrder.args';
import { GetOrdersWithPaginationArgs } from './dto/getOrders.args';

import { PaginationOutput } from '@pagination/pagination.types';
import { calculatePagination } from '@pagination/pagination.utils';

@Injectable()
export class OrdersService {
  constructor(
    private repository: OrdersRepository,
    private productsService: ProductsService,
  ) {
  }

  async createOrder(params: CreateOrderArgs) {
    for (const productInput of params.products) {
      const product = await this.productsService.getProductById(productInput.productId);

      if (!product) {
        throw new NotFoundException(`Product with ID ${productInput.productId} not found.`);
      }
    }

    return this.repository.createOrder({
      code: Number((Math.random() * 10000).toFixed()),
      billingInfo: { create: params.billingInfo },
      products: {
        create: params.products.map((product) => ({
          product: { connect: { id: product.productId } },
          count: product.count,
        })),
      },
      status: 'CREATED',
    });
  }


  async getOrderById(id: string) {
    return this.repository.getOrderById(id);
  }

  async getOrders(params: GetOrdersWithPaginationArgs): Promise<PaginationOutput<Order>> {
    const { page, limit, email } = params;
    const where: Prisma.OrderWhereInput = {};

    if (email) {
      where.billingInfo = { email };
    }

    const itemsReq = this.repository.getOrders({
      skip: (page - 1) * limit,
      take: limit,
      where,
    });

    const totalCountReq = this.repository.getCount({ where });

    const [items, totalCount] = await Promise.all([itemsReq, totalCountReq]);

    return {
      items,
      ...calculatePagination({ currentPage: page, limit, totalCount }),
    };
  }
}
