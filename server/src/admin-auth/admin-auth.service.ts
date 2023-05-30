/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Admin, DepositHistory, Prisma, WithdrawalCode } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminAuthService {
  constructor(private prisma: PrismaService) {}

  createAdmin(data: Prisma.AdminCreateInput): Promise<Admin> {
    return this.prisma.admin.create({
      data,
    });
  }
  updateAdmin(
    where: Prisma.AdminWhereUniqueInput,
    data: Prisma.AdminUpdateInput,
  ): Promise<Admin> {
    return this.prisma.admin.update({
      where,
      data,
    });
  }
  getUser(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
    return this.prisma.admin.findUnique({
      where,
    });
  }
  getAdminArray(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }
  createCode(data: Prisma.WithdrawalCodeCreateInput): Promise<WithdrawalCode> {
    return this.prisma.withdrawalCode.create({
      data,
    });
  }
  deleteCode(
    where: Prisma.WithdrawalCodeWhereUniqueInput,
  ): Promise<WithdrawalCode> {
    return this.prisma.withdrawalCode.delete({
      where,
    });
  }
  createDeposit(
    data: Prisma.DepositHistoryUncheckedCreateInput,
  ): Promise<DepositHistory> {
    return this.prisma.depositHistory.create({
      data,
    });
  }
}
