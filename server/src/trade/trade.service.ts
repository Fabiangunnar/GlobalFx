/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, Signal, Trades, TradingSignal } from '@prisma/client';
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
  getTradeSignal(
    where: Prisma.TradingSignalWhereUniqueInput,
  ): Promise<TradingSignal> {
    return this.prisma.tradingSignal.findUnique({ where });
  }

  createTradeSignal(
    data: Prisma.TradingSignalUncheckedCreateInput,
  ): Promise<TradingSignal> {
    return this.prisma.tradingSignal.create({ data });
  }
  getAllTradeSignals(): Promise<TradingSignal[]> {
    return this.prisma.tradingSignal.findMany();
  }
  updateTradeSignal(
    where: Prisma.TradingSignalWhereUniqueInput,
    data: Prisma.TradingSignalUpdateInput,
  ): Promise<TradingSignal> {
    return this.prisma.tradingSignal.update({ where, data });
  }
  deleteTradeSignal(where: Prisma.TradingSignalWhereUniqueInput): any {
    return this.prisma.tradingSignal.delete({ where });
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
