import { Prisma, Signal, Trades } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TradeService {
    private prisma;
    constructor(prisma: PrismaService);
    createTrade(data: Prisma.TradesUncheckedCreateInput): Promise<Trades>;
    createSignal(data: Prisma.SignalUncheckedCreateInput): Promise<Signal>;
    getAllTrades(): Promise<Trades[]>;
    getAllSignals(): Promise<Signal[]>;
    getMyTrades(where: Prisma.TradesWhereInput): Promise<Trades[]>;
    getMySignals(where: Prisma.SignalWhereInput): Promise<Signal[]>;
    deleteMyTrades(where: Prisma.TradesWhereInput): any;
    deleteMySignals(where: Prisma.SignalWhereInput): any;
}
