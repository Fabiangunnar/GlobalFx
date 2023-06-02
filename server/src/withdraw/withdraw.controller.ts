import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawalHistory } from '@prisma/client';
import { DepositDto as WithdrawDto } from 'src/deposit/depositDto/deposit.dto';
import { UserService } from 'src/user/user.service';

@Controller('withdraw')
export class WithdrawController {
  constructor(
    private withdrawService: WithdrawService,
    private userService: UserService,
  ) {}

  @Get('/all')
  async getAllWithdrawals(): Promise<WithdrawalHistory[]> {
    try {
      const withdrawData = await this.withdrawService.getAllWithdrawals();
      const users = await this.userService.getAllUsers();
      const newWithdrawData = withdrawData.map((withdraw) => {
        const { firstname, lastname } = users.find(
          (user) => user.id === withdraw.userId,
        );
        return { ...withdraw, firstname, lastname };
      });
      return newWithdrawData;
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/my/:userId')
  getMyWithdrawals(
    @Param('userId') userId: string,
  ): Promise<WithdrawalHistory[]> {
    return this.withdrawService.getMyWithdrawals({
      userId,
    });
  }

  @Post('/')
  async makeWithdrawal(@Body() withdraw: WithdrawDto) {
    try {
      if (
        !withdraw.asset ||
        !withdraw.amount ||
        !withdraw.userId ||
        !withdraw.walletAddress ||
        !withdraw.walletCode
      )
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );
      const user = await this.userService.getUser({ id: withdraw.userId });
      const isWithdrawCode = await this.withdrawService.getWalletCode({
        withdrawalCode: withdraw.walletCode,
      });
      if (!isWithdrawCode)
        throw new HttpException(
          'Provide a valid withdraw code',
          HttpStatus.FORBIDDEN,
        );
      if (!user)
        throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);
      if (Number(user.totalBalance) < Number(withdraw.amount))
        throw new HttpException('Insufficient funds', HttpStatus.FORBIDDEN);
      await this.withdrawService.deleteCode({
        withdrawalCode: withdraw.walletCode,
      });
      const withdrawal = await this.withdrawService.makeWithdrawal({
        asset: `${withdraw.asset}`,
        amount: Number(withdraw.amount),
        userId: `${withdraw.userId}`,
        walletAddress: `${withdraw.walletAddress}`,
      });
      await this.userService.updateUserInfo(
        { id: withdraw.userId },
        {
          totalBalance: user.totalBalance - withdraw.amount,
        },
      );
      return withdrawal;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
