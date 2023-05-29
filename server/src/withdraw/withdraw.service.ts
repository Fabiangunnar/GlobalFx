import { Injectable } from '@nestjs/common';
import { Prisma, WithdrawalCode, WithdrawalHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WithdrawService {
  constructor(private prisma: PrismaService) {}

  makeWithdrawal(
    data: Prisma.WithdrawalHistoryUncheckedCreateInput,
  ): Promise<WithdrawalHistory> {
    return this.prisma.withdrawalHistory.create({
      data,
    });
  }

  getAllWithdrawals(): Promise<WithdrawalHistory[]> {
    return this.prisma.withdrawalHistory.findMany();
  }
  deleteMyWithdrawals(where: Prisma.WithdrawalHistoryWhereInput) {
    return this.prisma.withdrawalHistory.deleteMany({
      where,
    });
  }
  getMyWithdrawals(
    where: Prisma.WithdrawalHistoryWhereInput,
  ): Promise<WithdrawalHistory[]> {
    return this.prisma.withdrawalHistory.findMany({
      where,
    });
  }
  getWalletCode(
    where: Prisma.WithdrawalCodeWhereUniqueInput,
  ): Promise<WithdrawalCode> {
    return this.prisma.withdrawalCode.findUnique({
      where,
    });
  }
  deleteCode(
    where: Prisma.WithdrawalCodeWhereUniqueInput,
  ): Promise<WithdrawalCode> {
    return this.prisma.withdrawalCode.delete({
      where,
    });
  }
}
