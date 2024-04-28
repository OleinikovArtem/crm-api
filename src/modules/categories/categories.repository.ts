import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {
  }

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
