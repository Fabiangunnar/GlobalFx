/* eslint-disable prettier/prettier */
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
import { adminAuthDto } from './admin-auth-dto/adminAuth.dto';
import { Admin, DepositHistory, WithdrawalCode } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
import { v4 as uuidv4 } from 'uuid';
import { DepositDto } from 'src/deposit/depositDto/deposit.dto';
import { UserService } from 'src/user/user.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  async createUser(@Body() user: adminAuthDto): Promise<Admin> {
    try {
      const { username, password } = user;
      if (!username || !password)
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );
      // const salt = 10;
      // const hashedPassword = await bcrypt.hash(user.password, salt);
      const data = await this.adminAuthService.createAdmin({
        username: user.username,
        password: user.password,
      });
      // delete data.password;
      return data;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async loginUser(@Body() user: adminAuthDto): Promise<Admin> {
    try {
      const data = await this.adminAuthService.getUser({
        username: user.username,
      });

      if (!data)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);

      const isMatch = user.password === data.password;
      if (!isMatch)
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

      return data;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/code')
  async createCode(): Promise<WithdrawalCode> {
    try {
      const uuid = uuidv4();
      const timeoutDuration = 3 * 60 * 60 * 1000 + 1 * 60 * 1000;
      const code = await this.adminAuthService.createCode({
        withdrawalCode: uuid,
      });

      setTimeout(async () => {
        await this.adminAuthService.deleteCode({
          withdrawalCode: uuid,
        });
      }, timeoutDuration);

      return code;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/my/:id')
  async getUser(@Param('id') id: string): Promise<Admin> {
    try {
      const data = await this.adminAuthService.getUser({
        id,
      });
      return data;
    } catch (error) {
      throw new HttpException(
        'Something terribly wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('/info/:id')
  async updateAdmin(
    @Body() user: adminAuthDto,
    @Param('id') id: string,
  ): Promise<Admin> {
    if (!id)
      throw new HttpException('Logout and login again', HttpStatus.FORBIDDEN);
    try {
      const data = await this.adminAuthService.getUser({
        username: user.username,
      });
      if (!data)
        throw new HttpException('Your Username is wrong', HttpStatus.NOT_FOUND);
      const app = await this.adminAuthService.updateAdmin(
        { id },
        {
          username: user.username,
          password: user.password,
          btc: user.btc,
          eth: user.eth,
          usdt: user.usdt,
          email: user.email,
          phone: user.phone,
        },
      );
      return app;
    } catch (error) {
      throw new HttpException(
        `Something terribly wrong \n ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/')
  async getAdminArray(): Promise<Admin[]> {
    try {
      const data = await this.adminAuthService.getAdminArray();

      const newData = await data.map((admin) => {
        delete admin.password;
        delete admin.username, delete admin.id;
        return admin;
      });

      return newData;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/user/deposit')
  async createDeposit(@Body() deposit: DepositDto): Promise<DepositHistory> {
    try {
      if (!deposit.amount || !deposit.userId || deposit.amount === 0)
        throw new HttpException(
          'Input field not complete',
          HttpStatus.BAD_REQUEST,
        );
      const user = await this.userService.getUser({ id: deposit.userId });

      const depo = await this.adminAuthService.createDeposit({
        asset: `BTC`,
        amount: Number(deposit.amount),
        userId: `${deposit.userId}`,
        to: 'admin',
        transactionState: 'VERIFIED',
      });
      await this.userService.updateUserInfo(
        { id: deposit.userId },
        {
          totalDeposit: depo.amount + user.totalDeposit,
          totalBalance: depo.amount + user.totalBalance,
        },
      );
      return depo;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
