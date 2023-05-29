import { Module } from '@nestjs/common';
import { WithdrawController } from './withdraw.controller';
import { WithdrawService } from './withdraw.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [WithdrawController],
  providers: [WithdrawService, PrismaService, UserService],
})
export class WithdrawModule {}
