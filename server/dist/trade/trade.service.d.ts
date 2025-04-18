import { Prisma, Signal, Trades, TradingSignal } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TradeService {
    private prisma;
    constructor(prisma: PrismaService);
    createTrade(data: Prisma.TradesUncheckedCreateInput): Promise<Trades>;
    createSignal(data: Prisma.SignalUncheckedCreateInput): Promise<Signal>;
    getAllTrades(): Promise<Trades[]>;
    getAllSignals(): Promise<Signal[]>;
    getTradeSignal(where: Prisma.TradingSignalWhereUniqueInput): Promise<TradingSignal>;
    createTradeSignal(data: Prisma.TradingSignalUncheckedCreateInput): Promise<TradingSignal>;
    getAllTradeSignals(): Promise<TradingSignal[]>;
    updateTradeSignal(where: Prisma.TradingSignalWhereUniqueInput, data: Prisma.TradingSignalUpdateInput): Promise<TradingSignal>;
    deleteTradeSignal(where: Prisma.TradingSignalWhereUniqueInput): any;
    getMyTrades(where: Prisma.TradesWhereInput): Promise<Trades[]>;
    getMySignals(where: Prisma.SignalWhereInput): Promise<Signal[]>;
    deleteMyTrades(where: Prisma.TradesWhereInput): any;
    deleteMySignals(where: Prisma.SignalWhereInput): any;
}
