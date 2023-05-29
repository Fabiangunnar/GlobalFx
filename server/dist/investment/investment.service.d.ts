import { InvestmentHistory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class InvestmentService {
    private prisma;
    constructor(prisma: PrismaService);
    makeInvestment(data: Prisma.InvestmentHistoryUncheckedCreateInput): Promise<InvestmentHistory>;
    getAllInvestments(): Promise<InvestmentHistory[]>;
    getMyInvestments(where: Prisma.InvestmentHistoryWhereInput): Promise<InvestmentHistory[]>;
    updateInvestmentStatus(where: Prisma.InvestmentHistoryWhereUniqueInput, data: Prisma.InvestmentHistoryUncheckedUpdateInput): Prisma.Prisma__InvestmentHistoryClient<InvestmentHistory, never>;
    deleteInvestmentHistory(where: Prisma.InvestmentHistoryWhereInput): any;
}
