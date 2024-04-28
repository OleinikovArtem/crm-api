import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma.module';
import { UsersResolver } from '@modules/users/users.resolver';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {
}
