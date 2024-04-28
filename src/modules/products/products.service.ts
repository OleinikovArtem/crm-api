import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Prisma, Product } from '@prisma/client';

import { CreateProductArgs } from './dto/createProduct.args';
import { UpdateProductArgs } from '@modules/products/dto/updateProduct.args';
import { GetProductsWithPaginationArgs } from './dto/getProducts.args';

import { PaginationOutput } from '@pagination/pagination.types';
import { calculatePagination } from '@pagination/pagination.utils';

@Injectable()
export class ProductsService {
  constructor(private repository: ProductsRepository) {
  }

  async createProduct(params: CreateProductArgs) {
    const { categories, ...data } = params;

    return this.repository.createProduct({
      ...data,
      ...this.createConnectOrCreateObjectForCategories(categories),
    });
  }

  async updateProduct(params: UpdateProductArgs) {
    const { categories, id, ...data } = params;

    return this.repository.updateProduct({
      where: { id },
      data: { ...data, ...this.createConnectOrCreateObjectForCategories(categories) },
    });
  }

  async getProductById(id: string) {
    return this.repository.getProductById(id);
  }


  async getProducts(params: GetProductsWithPaginationArgs): Promise<PaginationOutput<Product>> {
    const { page, limit, categories } = params;
    const where: Prisma.ProductWhereInput = {};

    if (categories?.length) {
      where.categories = { some: { OR: categories?.map(category => ({ name: category })) } };
    }

    const itemsReq = this.repository.getProducts({
      skip: ((page || 1) - 1) * limit,
      take: limit,
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
    const totalCountReq = this.repository.getCount({ where });

    const [items, totalCount] = await Promise.all([itemsReq, totalCountReq]);

    return {
      items,
      ...calculatePagination({ totalCount, limit, currentPage: page }),
    };
  }

  private createConnectOrCreateObjectForCategories(categories: string[] | undefined) {
    if (!categories) return {};

    return {
      categories: {
        connectOrCreate: categories?.map((category) => {
          return {
            where: { name: category },
            create: { name: category },
          };
        }),
      },
    };
  }
}
