import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TradeService, PrismaService, UserService],
  controllers: [TradeController],
})
export class TradeModule {}
