/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SupportTicketDto } from './supportDto/support.dto';
import { SupportTicket } from '@prisma/client';
import { SupportService } from './support.service';
import { UserService } from 'src/user/user.service';

@Controller('support')
export class SupportController {
  constructor(
    private supportTicketService: SupportService,
    private userService: UserService,
  ) {}
  @Post('/')
  async supportTicket(
    @Body() supportticket: SupportTicketDto,
  ): Promise<SupportTicket> {
    if (
      !supportticket.subject ||
      !supportticket.message ||
      !supportticket.userId
    )
      throw new HttpException(
        'Input field not complete',
        HttpStatus.BAD_REQUEST,
      );
    const data = await this.userService.getUser({ id: supportticket.userId });

    if (!data)
      throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);

    return this.supportTicketService.createSupportTicket({
      subject: `${supportticket.subject}`,
      message: `${supportticket.message}`,
      userId: `${supportticket.userId}`,
    });
  }

  @Get()
  async getAllUsers(): Promise<SupportTicket[]> {
    return this.supportTicketService.getAllSupportTickets();
  }
  @Get('/:userId')
  async getMySupportTickets(
    @Param('userId') userId: string,
  ): Promise<SupportTicket[]> {
    return this.supportTicketService.getMySupportTickets({ userId });
  }
}
