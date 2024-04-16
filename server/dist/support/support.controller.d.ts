import { SupportTicket } from '@prisma/client';
import { SupportService } from './support.service';
import { UserService } from 'src/user/user.service';
import { CreateSupportDto } from './dto/create-support.dto';
export declare class SupportController {
    private supportTicketService;
    private userService;
    constructor(supportTicketService: SupportService, userService: UserService);
    supportTicket(supportticket: CreateSupportDto): Promise<SupportTicket>;
    getAllUsers(): Promise<SupportTicket[]>;
    getMySupportTickets(userId: string): Promise<SupportTicket[]>;
}
