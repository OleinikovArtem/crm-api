import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';

import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersResolver } from './orders.resolver';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  providers: [OrdersRepository, OrdersService, OrdersResolver],
  exports: [OrdersService]
})
export class OrdersModule {}
