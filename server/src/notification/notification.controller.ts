import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notifications } from '@prisma/client';
import { NotificationDto } from './notificationsDto/notification.dto';
import { UserService } from 'src/user/user.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}
  @Post('/')
  async createNotification(
    @Body() notification: NotificationDto,
  ): Promise<Notifications> {
    try {
      if (!notification.message || !notification.userId)
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );
      const data = await this.userService.getUser({ id: notification.userId });

      if (!data)
        throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);

      return this.notificationService.createNotification({
        message: `${notification.message}`,
        userId: `${notification.userId}`,
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async getNotification(): Promise<Notifications[]> {
    return this.notificationService.getNotifications();
  }
  @Get('/:userId')
  async getMyNotifications(
    @Param('userId') userId: string,
  ): Promise<Notifications[]> {
    try {
      if (!userId)
        throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
      return this.notificationService.getMyNotifications({ userId });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
