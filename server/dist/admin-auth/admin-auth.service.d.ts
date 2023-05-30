import { Admin, DepositHistory, Prisma, WithdrawalCode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AdminAuthService {
    private prisma;
    constructor(prisma: PrismaService);
    createAdmin(data: Prisma.AdminCreateInput): Promise<Admin>;
    updateAdmin(where: Prisma.AdminWhereUniqueInput, data: Prisma.AdminUpdateInput): Promise<Admin>;
    getUser(where: Prisma.AdminWhereUniqueInput): Promise<Admin>;
    getAdminArray(): Promise<Admin[]>;
    createCode(data: Prisma.WithdrawalCodeCreateInput): Promise<WithdrawalCode>;
    deleteCode(where: Prisma.WithdrawalCodeWhereUniqueInput): Promise<WithdrawalCode>;
    createDeposit(data: Prisma.DepositHistoryUncheckedCreateInput): Promise<DepositHistory>;
}
