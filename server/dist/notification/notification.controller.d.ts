import { NotificationService } from './notification.service';
import { Notifications } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private notificationService;
    private userService;
    constructor(notificationService: NotificationService, userService: UserService);
    createNotification(notification: CreateNotificationDto): Promise<Notifications>;
    getNotification(): Promise<Notifications[]>;
    getMyNotifications(userId: string): Promise<Notifications[]>;
}
