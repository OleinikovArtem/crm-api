import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcryptjs from 'bcryptjs';

import { PaginationOutput } from '@pagination/pagination.types';
import { Prisma, User } from '@prisma/client';
import { calculatePagination } from '@pagination/pagination.utils';
import { GetUsersWithPaginationArgs } from '@modules/users/dto/getUsers.args';
import { UserWithoutPassword } from '@modules/users/user.model';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  async updateUser(email: string, data: User | UserWithoutPassword) {
    return this.repository.update(data.email, data);
  }

  async findById(id: string) {
    return this.repository.findOne({ id });
  }

  async getUsers(params: GetUsersWithPaginationArgs): Promise<PaginationOutput<User>> {
    const { page, limit } = params;
    const where: Prisma.UserWhereInput = {};

    const itemsReq = this.repository.getUsers({
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

  async createUser(inputData: { email: string, password: string, name: string }) {
    const password = await this.hashPassword(inputData.password);
    const data = { ...inputData, password };

    return this.repository.create(data);
  }

  async comparePassword(hash?: string, password?: string): Promise<boolean> {
    if (!password || !hash) return false;
    return bcryptjs.compareSync(password, hash);
  }

  async makeAdmin(email: string) {
    return this.repository.update(email, { role: 'ADMIN' });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }
}
