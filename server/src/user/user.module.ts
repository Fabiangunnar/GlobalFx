/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepositService } from 'src/deposit/deposit.service';
import { NotificationService } from 'src/notification/notification.service';
import { SupportService } from 'src/support/support.service';
import { InvestmentService } from 'src/investment/investment.service';
import { TradeService } from 'src/trade/trade.service';
import { WithdrawService } from 'src/withdraw/withdraw.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    DepositService,
    NotificationService,
    SupportService,
    InvestmentService,
    TradeService,
    WithdrawService,
  ],
})
export class UserModule {}
