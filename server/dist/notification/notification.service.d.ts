import { Notifications, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    createNotification(data: Prisma.NotificationsCreateInput): Promise<Notifications>;
    getNotifications(): Promise<Notifications[]>;
    getMyNotifications(where: Prisma.NotificationsWhereInput): Promise<Notifications[]>;
    deleteAllWhereUserId(where: Prisma.NotificationsWhereInput): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
