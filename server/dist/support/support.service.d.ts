import { Prisma, SupportTicket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SupportService {
    private prisma;
    constructor(prisma: PrismaService);
    createSupportTicket(data: Prisma.SupportTicketUncheckedCreateInput): Promise<SupportTicket>;
    getSupportTicket(where: Prisma.SupportTicketWhereUniqueInput): Promise<SupportTicket>;
    getAllSupportTickets(): Promise<SupportTicket[] | null>;
    getMySupportTickets(where: Prisma.SupportTicketWhereInput): Promise<SupportTicket[] | null>;
    deleteAllWhereUserId(where: Prisma.SupportTicketWhereInput): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
