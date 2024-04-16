import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { DepositModule } from './deposit/deposit.module';
import { InvestmentModule } from './investment/investment.module';
import { NotificationModule } from './notification/notification.module';
import { SupportModule } from './support/support.module';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AdminAuthModule, DepositModule, InvestmentModule, NotificationModule, SupportModule, TradeModule, UserModule, WithdrawModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
