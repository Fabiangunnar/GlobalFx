import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { UserService } from 'src/user/user.service';
import { DepositHistory, PendingDepositHistory } from '@prisma/client';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(
    private depositService: DepositService,
    private userService: UserService,
  ) {}

  @Post('/user/:userId/')
  async createUserDeposit(
    @Body() deposit: UpdateDepositDto,
    @Param('userId') userId: string,
  ): Promise<DepositHistory> {
    try {
      const user = await this.userService.getUser({ id: userId });

      if (!user)
        throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);
      const depositData = await this.depositService.createDeposit({
        asset: `${deposit.asset ? deposit.asset : 'BTC'}`,
        amount: Number(deposit.amount),
        userId: `${userId}`,
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
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/')
  async createDeposit(
    @Body() deposit: CreateDepositDto,
  ): Promise<DepositHistory> {
    try {
      const user = await this.userService.getUser({ id: deposit.userId });

      if (!user)
        throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);
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
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/all')
  async getAllDepositHistory(): Promise<DepositHistory[]> {
    try {
      const allDeposits = await this.depositService.getAllDepositHistory();
      const users = await this.userService.getAllUsers();

      const newDeposits = allDeposits.map((depositHistory) => {
        const { firstname, lastname } = users.find(
          (user) => user.id === depositHistory.userId,
        );
        return { ...depositHistory, firstname, lastname };
      });

      return newDeposits;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/user/verified/:userId')
  async getMyVerifiedDepositHistory(
    @Param('userId') userId: string,
  ): Promise<DepositHistory[]> {
    try {
      if (!userId)
        throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
      return this.depositService.getMyVerifiedDepositHistory({ userId });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/user/:userId')
  async getMyDepositHistory(
    @Param('userId') userId: string,
  ): Promise<DepositHistory[]> {
    try {
      if (!userId)
        throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
      return this.depositService.getMyDepositHistory({ userId });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/pending/:userId')
  async getMyPendingDeposits(
    @Param('userId') userId: string,
  ): Promise<PendingDepositHistory[]> {
    try {
      if (!userId)
        throw new HttpException('No User Specified', HttpStatus.BAD_REQUEST);
      return this.depositService.getMyPendingDeposits({ userId });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/verifytransaction/:id')
  async verifyTransaction(
    @Body() deposit: UpdateDepositDto,
    @Param('id') id: string,
  ): Promise<DepositHistory | any> {
    try {
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
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/mydeposit/:id')
  async updateDeposit(
    @Body() deposit: UpdateDepositDto,
    @Param('id') id: string,
  ): Promise<DepositHistory | any> {
    try {
      const depositState = await this.depositService.getDepositHistory({ id });
      const pendingDeposit = await this.depositService.getPendingDeposit({
        depositId: depositState.id,
      });

      if (pendingDeposit) {
        await this.depositService.updatePendingDeposit(
          {
            depositId: depositState.id,
          },
          {
            amount: Number(deposit.amount),
          },
        );
      }

      return this.depositService.verifyTransaction(
        { id },
        { amount: Number(deposit.amount) },
      );
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/mydeposit/:id')
  async deleteMyDeposit(
    @Param('id') id: string,
  ): Promise<DepositHistory | any> {
    try {
      const depositState = await this.depositService.getDepositHistory({ id });
      const pendingDeposit = await this.depositService.getPendingDeposit({
        depositId: depositState.id,
      });
      const user = await this.userService.getUser({ id: depositState.userId });

      if (pendingDeposit) {
        await this.userService.updateUserInfo(
          { id: user.id },
          {
            totalBalance: user.totalBalance - depositState.amount,
          },
        );
        await this.depositService.deletePendingDeposit({
          depositId: depositState.id,
        });
        await this.depositService.deleteMyDeposit({ id });
        return this.depositService.getMyDepositHistory({ id: user.id });
      }

      await this.userService.updateUserInfo(
        { id: user.id },
        {
          totalDeposit: user.totalDeposit - depositState.amount,
          totalBalance: user.totalBalance - depositState.amount,
        },
      );

      await this.depositService.deleteMyDeposit({ id });

      return this.depositService.getMyDepositHistory({ id: user.id });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
