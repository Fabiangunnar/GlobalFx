/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SupportModule } from './support/support.module';
import { NotificationModule } from './notification/notification.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { InvestmentModule } from './investment/investment.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    UserModule,
    AdminAuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], // exclude the /api/user-image endpoint from static file serving
    }),
    SupportModule,
    NotificationModule,
    DepositModule,
    WithdrawModule,
    InvestmentModule,
    TradeModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
