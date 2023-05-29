import { Prisma, WithdrawalCode, WithdrawalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class WithdrawService {
    private prisma;
    constructor(prisma: PrismaService);
    makeWithdrawal(data: Prisma.WithdrawalHistoryUncheckedCreateInput): Promise<WithdrawalHistory>;
    getAllWithdrawals(): Promise<WithdrawalHistory[]>;
    deleteMyWithdrawals(where: Prisma.WithdrawalHistoryWhereInput): Prisma.PrismaPromise<Prisma.BatchPayload>;
    getMyWithdrawals(where: Prisma.WithdrawalHistoryWhereInput): Promise<WithdrawalHistory[]>;
    getWalletCode(where: Prisma.WithdrawalCodeWhereUniqueInput): Promise<WithdrawalCode>;
    deleteCode(where: Prisma.WithdrawalCodeWhereUniqueInput): Promise<WithdrawalCode>;
}
