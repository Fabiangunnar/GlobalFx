import { NotificationService } from './notification.service';
import { Notifications } from '@prisma/client';
import { NotificationDto } from './notificationsDto/notification.dto';
import { UserService } from 'src/user/user.service';
export declare class NotificationController {
    private notificationService;
    private userService;
    constructor(notificationService: NotificationService, userService: UserService);
    createNotification(notification: NotificationDto): Promise<Notifications>;
    getNotification(): Promise<Notifications[]>;
    getMyNotifications(userId: string): Promise<Notifications[]>;
}
