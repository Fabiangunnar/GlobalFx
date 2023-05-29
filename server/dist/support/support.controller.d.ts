import { SupportTicketDto } from './supportDto/support.dto';
import { SupportTicket } from '@prisma/client';
import { SupportService } from './support.service';
import { UserService } from 'src/user/user.service';
export declare class SupportController {
    private supportTicketService;
    private userService;
    constructor(supportTicketService: SupportService, userService: UserService);
    supportTicket(supportticket: SupportTicketDto): Promise<SupportTicket>;
    getAllUsers(): Promise<SupportTicket[]>;
    getMySupportTickets(userId: string): Promise<SupportTicket[]>;
}
