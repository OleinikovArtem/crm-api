import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {
  }

  async findOne({ email, id }: Prisma.UserWhereUniqueInput) {
    if (!email && !id) return null;
    const where = {} as Prisma.UserWhereUniqueInput;

    if (id) {
      where.id = id;
    } else if (email) {
      where.email = email;
    }

    return this.prisma.user.findUnique({ where });
  }

  async update(email: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { email }, data });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany({ ...params });
  }

  async getCount(params?: {
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<number> {
    return this.prisma.user.count(params);
  }
}
