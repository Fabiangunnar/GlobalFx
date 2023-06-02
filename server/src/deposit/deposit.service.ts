import { Injectable } from '@nestjs/common';
import { DepositHistory, PendingDepositHistory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepositService {
  constructor(private prisma: PrismaService) {}

  createDeposit(
    data: Prisma.DepositHistoryUncheckedCreateInput,
  ): Promise<DepositHistory> {
    return this.prisma.depositHistory.create({
      data,
    });
  }
  verifyTransaction(
    where: Prisma.DepositHistoryWhereUniqueInput,
    data: Prisma.DepositHistoryUncheckedCreateInput,
  ): Promise<DepositHistory> {
    return this.prisma.depositHistory.update({
      where,
      data,
    });
  }

  getDepositHistory(
    where: Prisma.DepositHistoryWhereUniqueInput,
  ): Promise<DepositHistory> {
    return this.prisma.depositHistory.findUnique({
      where,
    });
  }

  getAllDepositHistory(): Promise<DepositHistory[]> {
    return this.prisma.depositHistory.findMany();
  }
  getMyDepositHistory(
    where: Prisma.DepositHistoryWhereInput,
  ): Promise<DepositHistory[]> {
    return this.prisma.depositHistory.findMany({
      where,
    });
  }
  deleteAllWhereUserId(where: Prisma.DepositHistoryWhereInput) {
    return this.prisma.depositHistory.deleteMany({
      where,
    });
  }

  addPendingDeposit(
    data: Prisma.PendingDepositHistoryUncheckedCreateInput,
  ): Promise<PendingDepositHistory> {
    return this.prisma.pendingDepositHistory.create({
      data,
    });
  }
  deletePendingDeposit(
    where: Prisma.PendingDepositHistoryWhereUniqueInput,
  ): Promise<PendingDepositHistory> {
    return this.prisma.pendingDepositHistory.delete({
      where,
    });
  }
  deleteMyPendingDeposits(
    where: Prisma.PendingDepositHistoryWhereInput,
  ): Promise<any> {
    return this.prisma.pendingDepositHistory.deleteMany({
      where,
    });
  }
  updatePendingDeposit(
    where: Prisma.PendingDepositHistoryWhereUniqueInput,
    data: Prisma.PendingDepositHistoryUncheckedCreateInput,
  ): Promise<PendingDepositHistory> {
    return this.prisma.pendingDepositHistory.update({
      where,
      data,
    });
  }

  getAllPendingDeposits(): Promise<PendingDepositHistory[]> {
    return this.prisma.pendingDepositHistory.findMany();
  }
  getMyPendingDeposits(
    where: Prisma.PendingDepositHistoryWhereInput,
  ): Promise<PendingDepositHistory[]> {
    return this.prisma.pendingDepositHistory.findMany({
      where,
    });
  }
  getPendingDeposit(
    where: Prisma.PendingDepositHistoryWhereUniqueInput,
  ): Promise<PendingDepositHistory> {
    return this.prisma.pendingDepositHistory.findUnique({
      where,
    });
  }
}
