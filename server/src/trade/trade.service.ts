import { Injectable } from '@nestjs/common';
import { Prisma, Trades } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  createTrade(data: Prisma.TradesUncheckedCreateInput): Promise<Trades> {
    return this.prisma.trades.create({ data });
  }

  getAllTrades(): Promise<Trades[]> {
    return this.prisma.trades.findMany();
  }
  getMyTrades(where: Prisma.TradesWhereInput): Promise<Trades[]> {
    return this.prisma.trades.findMany({ where });
  }

  deleteMyTrades(where: Prisma.TradesWhereInput): any {
    return this.prisma.trades.deleteMany({ where });
  }
}
