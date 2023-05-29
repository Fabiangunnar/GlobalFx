import { Prisma, Trades } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TradeService {
    private prisma;
    constructor(prisma: PrismaService);
    createTrade(data: Prisma.TradesUncheckedCreateInput): Promise<Trades>;
    getAllTrades(): Promise<Trades[]>;
    getMyTrades(where: Prisma.TradesWhereInput): Promise<Trades[]>;
    deleteMyTrades(where: Prisma.TradesWhereInput): any;
}
