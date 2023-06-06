import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestDto } from './investmentdto/investment.dto';
import { UserService } from 'src/user/user.service';
import { InvestmentHistory } from '@prisma/client';

@Controller('investment')
export class InvestmentController {
  constructor(
    private investmentService: InvestmentService,
    private userService: UserService,
  ) {}

  @Post()
  async makeInvestment(
    @Body() investDto: InvestDto,
  ): Promise<InvestmentHistory> {
    try {
      if (!investDto.amount || !investDto.plan || !investDto.userId)
        throw new HttpException(
          'Input fields incomplete',
          HttpStatus.BAD_REQUEST,
        );
      if (
        investDto.plan !== 'BASIC' &&
        investDto.plan !== 'STANDARD' &&
        investDto.plan !== 'PROMO' &&
        investDto.plan !== 'LUXURY'
      )
        throw new HttpException(
          'Wrong investment plan',
          HttpStatus.BAD_REQUEST,
        );
      if (investDto.plan === 'BASIC') {
        if (Number(investDto.amount) < 500 || Number(investDto.amount) > 4500) {
          throw new HttpException(
            'Select within the required amount for this plan',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (investDto.plan === 'PROMO') {
        if (
          Number(investDto.amount) < 2000 ||
          Number(investDto.amount) > 20000
        ) {
          throw new HttpException(
            'Select within the required amount for this plan',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (investDto.plan === 'STANDARD') {
        if (
          Number(investDto.amount) < 5000 ||
          Number(investDto.amount) > 14000
        ) {
          throw new HttpException(
            'Select within the required amount for this plan',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (investDto.plan === 'LUXURY') {
        if (
          Number(investDto.amount) < 15000 ||
          Number(investDto.amount) > 60000
        ) {
          throw new HttpException(
            'Select within the required amount for this plan',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const user = await this.userService.getUser({ id: investDto.userId });

      if (!user)
        throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);

      if (user.totalBalance < investDto.amount)
        throw new HttpException(
          'Insufficient funds for this transaction',
          HttpStatus.FORBIDDEN,
        );

      const investData = await this.investmentService.makeInvestment({
        amount: Number(investDto.amount),
        plan: investDto.plan,
        userId: investDto.userId,
      });

      await this.userService.updateUserInfo(
        {
          id: investDto.userId,
        },
        {
          totalBalance: Number(user.totalBalance) - Number(investDto.amount),
        },
      );

      return investData;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('/all')
  async getAllInvestments(): Promise<InvestmentHistory[]> {
    try {
      const investments = await this.investmentService.getAllInvestments();
      const users = await this.userService.getAllUsers();

      const newInvestments = investments.map((investment) => {
        const { firstname, lastname } = users.find(
          (user) => user.id === investment.userId,
        );
        return {
          ...investment,
          firstname,
          lastname,
        };
      });
      return newInvestments;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/my/:userId')
  async getMyInvestments(
    @Param('userId') userId: string,
  ): Promise<InvestmentHistory[]> {
    return await this.investmentService.getMyInvestments({ userId });
  }

  @Put('/admin/:id')
  async updateInvestmentStatus(
    @Param('id') id: string,
    @Body() investDto: InvestDto,
  ): Promise<InvestmentHistory> {
    try {
      if (
        investDto.status !== 'PENDING' &&
        investDto.status !== 'VERIFIED' &&
        investDto.status !== 'NOT_VERIFIED'
      )
        throw new HttpException(
          `Can't set the status to ${investDto.status}`,
          HttpStatus.BAD_REQUEST,
        );

      return this.investmentService.updateInvestmentStatus(
        { id },
        { status: investDto.status },
      );
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
