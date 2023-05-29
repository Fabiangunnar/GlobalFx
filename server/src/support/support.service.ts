/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, SupportTicket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  createSupportTicket(
    data: Prisma.SupportTicketUncheckedCreateInput,
  ): Promise<SupportTicket> {
    return this.prisma.supportTicket.create({
      data,
    });
  }

  getSupportTicket(
    where: Prisma.SupportTicketWhereUniqueInput,
  ): Promise<SupportTicket> {
    return this.prisma.supportTicket.findUnique({
      where,
    });
  }

  getAllSupportTickets(): Promise<SupportTicket[] | null> {
    return this.prisma.supportTicket.findMany();
  }
  getMySupportTickets(
    where: Prisma.SupportTicketWhereInput,
  ): Promise<SupportTicket[] | null> {
    return this.prisma.supportTicket.findMany({
      where,
    });
  }

  deleteAllWhereUserId(where: Prisma.SupportTicketWhereInput) {
    return this.prisma.supportTicket.deleteMany({
      where,
    });
  }
}
