/* eslint-disable prettier/prettier */
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
import { KYCVerification, User } from '@prisma/client';
import {
  AccountStateDto,
  KycVerifyDto,
  PhoneNumberDto,
  UserAccountInfo,
  UserDto,
} from './userDto/user.dto';
import { UserService } from './user.service';
import { SupportService } from 'src/support/support.service';
import { NotificationService } from 'src/notification/notification.service';
import { DepositService } from 'src/deposit/deposit.service';
import { InvestmentService } from 'src/investment/investment.service';
import { TradeService } from 'src/trade/trade.service';
import { WithdrawService } from 'src/withdraw/withdraw.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private supportService: SupportService,
    private notificationService: NotificationService,
    private depositService: DepositService,
    private investmentService: InvestmentService,
    private tradesService: TradeService,
    private withdrawService: WithdrawService,
  ) {}
  @Post('/register')
  async createUser(@Body() user: UserDto): Promise<User> {
    try {
      const { firstname, lastname, email, password, confirmPassword } = user;
      if (!firstname || !lastname || !email || !password)
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );

      const data = await this.userService.getUser({
        email: email.toLowerCase(),
      });
      if (data)
        throw new HttpException(
          'user already registered',
          HttpStatus.NOT_FOUND,
        );

      if (JSON.stringify(password) !== JSON.stringify(confirmPassword)) {
        throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
      }
      delete user.confirmPassword;
      return await this.userService.createUser({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/login')
  async loginUser(@Body() user: UserDto): Promise<User> {
    const { email, password } = user;
    if (!email || !password)
      throw new HttpException(
        'Input field not complete',
        HttpStatus.BAD_REQUEST,
      );

    delete user.confirmPassword;
    const data = await this.userService.getUser({
      email: `${email.toLowerCase()}`,
    });

    if (!data)
      throw new HttpException("User Doesn't exist", HttpStatus.NOT_FOUND);

    await this.userService.updateUserInfo(
      { email },
      {
        lastLogin: new Date(),
      },
    );

    return data;
  }

  @Get('/all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Get('/kyc/all')
  async getAllKYCDocuments(): Promise<KYCVerification[]> {
    const users = await this.userService.getAllUsers();
    const kycDocuments = await this.userService.getAllKycDocuments();
    return kycDocuments.map((item) => {
      const match = users.find((user) => user.id === item.userId);
      const { firstname, lastname } = match;
      return match ? { ...item, firstname, lastname } : null;
    });
  }
  @Get('/kyc/:userId')
  async getMyKycDocuments(
    @Param('userId') userId: string,
  ): Promise<KYCVerification[]> {
    try {
      if (!userId)
        throw new HttpException("Document Doesn't exist", HttpStatus.NOT_FOUND);
      return this.userService.getMyKycDocuments({
        userId,
      });
    } catch (error) {
      throw new HttpException(
        'Something terribly wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    if (!id)
      throw new HttpException("User Doesn't exist", HttpStatus.NOT_FOUND);

    return this.userService.getUser({ id });
  }

  @Put('/account/:id')
  async updateUserAccountInfo(
    @Body() accountInfo: UserAccountInfo,
    @Param('id') id: string,
  ) {
    try {
      const { totalBalance, totalProfit } = accountInfo;
      if (
        (!totalProfit || Number(totalProfit) === 0) &&
        (!totalBalance || Number(totalBalance) === 0)
      ) {
        throw new HttpException(`Input not right`, HttpStatus.BAD_REQUEST);
      }

      if (!totalProfit || (Number(totalProfit) === 0 && totalBalance)) {
        return await this.userService.updateUserInfo(
          { id },
          {
            totalBalance: Number(totalBalance),
          },
        );
      } else if (!totalBalance || (Number(totalBalance) === 0 && totalProfit)) {
        return await this.userService.updateUserInfo(
          { id },
          {
            totalProfit: Number(totalProfit),
          },
        );
      } else {
        return await this.userService.updateUserInfo(
          { id },
          {
            totalBalance: Number(totalBalance),
            totalProfit: Number(totalProfit),
          },
        );
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('/picture/:id')
  async updateProfilePicture(
    @Body() profilePictureInfo: UserAccountInfo,
    @Param('id') id: string,
  ): Promise<User> {
    if (!profilePictureInfo.picture) {
      throw new HttpException(
        'Input field not complete',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.updateUserInfo(
      { id },
      {
        picture: `${profilePictureInfo.picture}`,
      },
    );
  }
  @Put('/phone/:id')
  async updatePhoneNumber(
    @Body() phoneNumberInfo: PhoneNumberDto,
    @Param('id') id: string,
  ): Promise<User> {
    if (!phoneNumberInfo.phoneNumber) {
      throw new HttpException(
        'Input field not complete',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.updateUserInfo(
      { id },
      {
        phoneNumber: `${phoneNumberInfo.phoneNumber}`,
      },
    );
  }

  @Put('/verifyuser/:id')
  async verifyUser(
    @Body() accountState: AccountStateDto,
    @Param('id') id: string,
  ): Promise<User | any> {
    try {
      if (accountState.accountState === 'PENDING') {
        return this.userService.updateUserInfo(
          { id },
          { accountState: accountState.accountState },
        );
      }
      if (accountState.accountState === 'VERIFIED') {
        return this.userService.updateUserInfo(
          { id },
          { accountState: accountState.accountState },
        );
      }
      if (accountState.accountState === 'BLOCKED') {
        return this.userService.updateUserInfo(
          { id },
          { accountState: accountState.accountState },
        );
      }
      return new HttpException('cannot change', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('/kycverify/:id')
  async verifykycDoc(
    @Body() kycStatus: KycVerifyDto,
    @Param('id') id: string,
  ): Promise<KYCVerification> {
    try {
      if (
        kycStatus.status !== 'VERIFIED' ||
        kycStatus.status !== 'PENDING' ||
        kycStatus.status !== 'NOT_VERIFIED'
      )
        throw new HttpException('Wrong Data', HttpStatus.BAD_REQUEST);
      return this.userService.updateKycStatus(
        { id },
        { status: kycStatus.status },
      );
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('/kyc/:id')
  async kycVerify(
    @Body() kycVer: KycVerifyDto,
    @Param('id') id: string,
  ): Promise<KYCVerification> {
    try {
      if (!kycVer.idDocuments || !kycVer.proofOfAddress) {
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );
      }
      const kyc: any = this.userService.getMyKycDocuments({
        userId: id,
      });
      if (kyc.length > 0)
        throw new HttpException(
          `You have already given your documents, `,
          HttpStatus.NOT_ACCEPTABLE,
        );

      return this.userService.verifyKyc({
        userId: id,
        idDocuments: `${kycVer.idDocuments}`,
        proofOfAddress: `${kycVer.proofOfAddress}`,
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUser({ id });
      await this.depositService.deleteAllWhereUserId({ userId: user.id });
      await this.depositService.deleteMyPendingDeposits({ userId: user.id });
      await this.notificationService.deleteAllWhereUserId({ userId: user.id });
      await this.supportService.deleteAllWhereUserId({ userId: user.id });
      await this.withdrawService.deleteMyWithdrawals({ userId: user.id });
      await this.investmentService.deleteInvestmentHistory({ userId: id });
      await this.tradesService.deleteMyTrades({ userId: id });
      await this.userService.deleteKycStatus({ userId: id });
      return this.userService.deleteUser({ id });
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
