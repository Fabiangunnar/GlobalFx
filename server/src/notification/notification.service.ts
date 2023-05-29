/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Notifications, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  createNotification(
    data: Prisma.NotificationsCreateInput,
  ): Promise<Notifications> {
    return this.prisma.notifications.create({
      data,
    });
  }
  getNotifications(): Promise<Notifications[]> {
    return this.prisma.notifications.findMany();
  }
  getMyNotifications(
    where: Prisma.NotificationsWhereInput,
  ): Promise<Notifications[]> {
    return this.prisma.notifications.findMany({
      where,
    });
  }
  deleteAllWhereUserId(where: Prisma.NotificationsWhereInput) {
    return this.prisma.notifications.deleteMany({
      where,
    });
  }
}
