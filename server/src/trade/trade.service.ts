/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, Signal, Trades } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  createTrade(data: Prisma.TradesUncheckedCreateInput): Promise<Trades> {
    return this.prisma.trades.create({ data });
  }
  createSignal(data: Prisma.SignalUncheckedCreateInput): Promise<Signal> {
    return this.prisma.signal.create({ data });
  }

  getAllTrades(): Promise<Trades[]> {
    return this.prisma.trades.findMany();
  }
  getAllSignals(): Promise<Signal[]> {
    return this.prisma.signal.findMany({
      include: {
        user: true,
      },
    });
  }
  getMyTrades(where: Prisma.TradesWhereInput): Promise<Trades[]> {
    return this.prisma.trades.findMany({ where });
  }
  getMySignals(where: Prisma.SignalWhereInput): Promise<Signal[]> {
    return this.prisma.signal.findMany({ where });
  }

  deleteMyTrades(where: Prisma.TradesWhereInput): any {
    return this.prisma.trades.deleteMany({ where });
  }
  deleteMySignals(where: Prisma.SignalWhereInput): any {
    return this.prisma.signal.deleteMany({ where });
  }
}
