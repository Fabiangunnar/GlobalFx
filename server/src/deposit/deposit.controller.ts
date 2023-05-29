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
import { DepositService } from './deposit.service';
import { UserService } from 'src/user/user.service';
import { DepositDto } from './depositDto/deposit.dto';
import { DepositHistory, PendingDepositHistory } from '@prisma/client';

@Controller('deposit')
export class DepositController {
  constructor(
    private depositService: DepositService,
    private userService: UserService,
  ) {}

  @Post('/')
  async createDeposit(@Body() deposit: DepositDto): Promise<DepositHistory> {
    if (!deposit.asset || !deposit.amount || !deposit.userId || !deposit.to)
      throw new HttpException(
        'Input field not complete',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userService.getUser({ id: deposit.userId });

    if (!user)
      throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);

    await this.userService.updateUserInfo(
      { id: deposit.userId },
      {
        // pendingDeposit: user.pendingDeposit + Number(deposit.amount),
      },
    );
    const depositData = await this.depositService.createDeposit({
      asset: `${deposit.asset}`,
      amount: Number(deposit.amount),
      userId: `${deposit.userId}`,
      to: `${deposit.to}`,
    });

    if (depositData) {
      await this.depositService.addPendingDeposit({
        amount: Number(deposit.amount),
        userId: `${deposit.userId}`,
        depositId: `${depositData.id}`,
      });
    }

    return depositData;
  }
  @Get('/all')
  async getAllDepositHistory(): Promise<DepositHistory[]> {
    const allDeposits = await this.depositService.getAllDepositHistory();
    const users = await this.userService.getAllUsers();

    const newDeposits = allDeposits.map((depositHistory) => {
      const { firstname, lastname } = users.find(
        (user) => user.id === depositHistory.userId,
      );
      return { ...depositHistory, firstname, lastname };
    });

    return newDeposits;
  }
  @Get('/all/:userId')
  async getMyDepositHistory(
    @Param('userId') userId: string,
  ): Promise<DepositHistory[]> {
    if (!userId)
      throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
    return this.depositService.getMyDepositHistory({ userId });
  }
  @Get('/:userId')
  async getMyPendingDeposits(
    @Param('userId') userId: string,
  ): Promise<PendingDepositHistory[]> {
    if (!userId)
      throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
    return this.depositService.getMyPendingDeposits({ userId });
  }

  @Put('/verifytransaction/:id')
  async verifyTransaction(
    @Body() deposit: DepositDto,
    @Param('id') id: string,
  ): Promise<DepositHistory | any> {
    const depositState = await this.depositService.getDepositHistory({ id });
    const user = await this.userService.getUser({ id: depositState.userId });
    const pendingDeposit = await this.depositService.getPendingDeposit({
      depositId: depositState.id,
    });

    if (depositState.transactionState !== 'PENDING')
      throw new HttpException(
        'client required to make a new Deposit',
        HttpStatus.FORBIDDEN,
      );

    if (deposit.transactionState === 'PENDING') {
      return this.depositService.verifyTransaction(
        { id },
        { transactionState: deposit.transactionState },
      );
    }
    if (deposit.transactionState === 'VERIFIED') {
      await this.userService.updateUserInfo(
        { id: depositState.userId },
        {
          totalDeposit: pendingDeposit.amount + user.totalDeposit,
          totalBalance: pendingDeposit.amount + user.totalBalance,
        },
      );
      await this.depositService.deletePendingDeposit({
        depositId: depositState.id,
      });
      return this.depositService.verifyTransaction(
        { id },
        { transactionState: deposit.transactionState },
      );
    }
    if (deposit.transactionState === 'NOT_VERIFIED') {
      await this.depositService.deletePendingDeposit({
        depositId: depositState.id,
      });
      return this.depositService.verifyTransaction(
        { id },
        { transactionState: deposit.transactionState },
      );
    }
    return new HttpException('cannot change', HttpStatus.BAD_REQUEST);
  }
}
