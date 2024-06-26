import { Prisma, WithdrawalCode, WithdrawalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class WithdrawService {
    private prisma;
    constructor(prisma: PrismaService);
    makeWithdrawal(data: Prisma.WithdrawalHistoryUncheckedCreateInput): Promise<WithdrawalHistory>;
    getAllWithdrawals(): Promise<WithdrawalHistory[]>;
    deleteMyWithdrawals(where: Prisma.WithdrawalHistoryWhereInput): Prisma.PrismaPromise<Prisma.BatchPayload>;
    getWithdrawal(where: Prisma.WithdrawalHistoryWhereUniqueInput): Promise<WithdrawalHistory>;
    updateWithdrawal(where: Prisma.WithdrawalHistoryWhereUniqueInput, data: Prisma.WithdrawalHistoryUncheckedCreateInput): Promise<WithdrawalHistory>;
    getMyWithdrawals(where: Prisma.WithdrawalHistoryWhereInput): Promise<WithdrawalHistory[]>;
    getWalletCode(where: Prisma.WithdrawalCodeWhereUniqueInput): Promise<WithdrawalCode>;
    deleteCode(where: Prisma.WithdrawalCodeWhereUniqueInput): Promise<WithdrawalCode>;
}
