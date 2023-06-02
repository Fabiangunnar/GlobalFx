import { DepositHistory, PendingDepositHistory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class DepositService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeposit(data: Prisma.DepositHistoryUncheckedCreateInput): Promise<DepositHistory>;
    verifyTransaction(where: Prisma.DepositHistoryWhereUniqueInput, data: Prisma.DepositHistoryUncheckedCreateInput): Promise<DepositHistory>;
    getDepositHistory(where: Prisma.DepositHistoryWhereUniqueInput): Promise<DepositHistory>;
    getAllDepositHistory(): Promise<DepositHistory[]>;
    getMyDepositHistory(where: Prisma.DepositHistoryWhereInput): Promise<DepositHistory[]>;
    deleteAllWhereUserId(where: Prisma.DepositHistoryWhereInput): Prisma.PrismaPromise<Prisma.BatchPayload>;
    addPendingDeposit(data: Prisma.PendingDepositHistoryUncheckedCreateInput): Promise<PendingDepositHistory>;
    deletePendingDeposit(where: Prisma.PendingDepositHistoryWhereUniqueInput): Promise<PendingDepositHistory>;
    deleteMyPendingDeposits(where: Prisma.PendingDepositHistoryWhereInput): Promise<any>;
    updatePendingDeposit(where: Prisma.PendingDepositHistoryWhereUniqueInput, data: Prisma.PendingDepositHistoryUncheckedCreateInput): Promise<PendingDepositHistory>;
    getAllPendingDeposits(): Promise<PendingDepositHistory[]>;
    getMyPendingDeposits(where: Prisma.PendingDepositHistoryWhereInput): Promise<PendingDepositHistory[]>;
    getPendingDeposit(where: Prisma.PendingDepositHistoryWhereUniqueInput): Promise<PendingDepositHistory>;
}
