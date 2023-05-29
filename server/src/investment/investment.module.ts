import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, PrismaService, UserService],
})
export class InvestmentModule {}
