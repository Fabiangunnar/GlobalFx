import { Injectable } from '@nestjs/common';
import { InvestmentHistory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvestmentService {
  constructor(private prisma: PrismaService) {}

  makeInvestment(
    data: Prisma.InvestmentHistoryUncheckedCreateInput,
  ): Promise<InvestmentHistory> {
    return this.prisma.investmentHistory.create({
      data,
    });
  }

  getAllInvestments(): Promise<InvestmentHistory[]> {
    return this.prisma.investmentHistory.findMany();
  }

  getMyInvestments(
    where: Prisma.InvestmentHistoryWhereInput,
  ): Promise<InvestmentHistory[]> {
    return this.prisma.investmentHistory.findMany({
      where,
    });
  }

  updateInvestmentStatus(
    where: Prisma.InvestmentHistoryWhereUniqueInput,
    data: Prisma.InvestmentHistoryUncheckedUpdateInput,
  ) {
    return this.prisma.investmentHistory.update({
      where,
      data,
    });
  }

  deleteInvestmentHistory(where: Prisma.InvestmentHistoryWhereInput): any {
    return this.prisma.investmentHistory.deleteMany({
      where,
    });
  }
}
